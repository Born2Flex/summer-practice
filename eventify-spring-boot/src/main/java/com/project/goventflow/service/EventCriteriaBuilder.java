package com.project.goventflow.service;

import com.project.goventflow.domain.dto.event.EventSearchParams;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class EventCriteriaBuilder {

    public Criteria buildBaseCriteria(EventSearchParams params) {
        List<Criteria> criteriaList = new ArrayList<>();

        if (params.getEventType() != null && !params.getEventType().isEmpty()) {
            criteriaList.add(Criteria.where("eventType").in(params.getEventType()));
        }

        if (params.getAvailability() != null && !params.getAvailability().isEmpty()) {
            criteriaList.add(Criteria.where("availability").in(params.getAvailability()));
        }

        LocalDateTime start = (params.getFrom() != null) ? params.getFrom() : LocalDateTime.now();
        Criteria dateCriteria = Criteria.where("startDateTime").gte(start);

        if (params.getTo() != null) {
            dateCriteria.lte(params.getTo());
        }
        criteriaList.add(dateCriteria);

        if (params.getTags() != null && !params.getTags().isEmpty()) {
            criteriaList.add(Criteria.where("tags").elemMatch(
                    Criteria.where("$in").is(normalizeTags(params.getTags()))
            ));
        }

        return new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));
    }

    public Criteria nearSphereFilter(double latitude, double longitude, int radiusInKilometers) {
        Point location = new Point(latitude, longitude);
        Distance distance = new Distance(radiusInKilometers, Metrics.KILOMETERS);
        return Criteria.where("location").nearSphere(location).maxDistance(distance.getNormalizedValue());
    }

    public Criteria withinSphereFilter(double latitude, double longitude, int radiusInKilometers) {
        Point location = new Point(latitude, longitude);
        Distance distance = new Distance(radiusInKilometers, Metrics.KILOMETERS);
        return Criteria.where("location").withinSphere(new Circle(location, distance.getNormalizedValue()));
    }

    private List<String> normalizeTags(List<String> tags) {
        return tags.stream().map(String::toLowerCase).toList();
    }
}