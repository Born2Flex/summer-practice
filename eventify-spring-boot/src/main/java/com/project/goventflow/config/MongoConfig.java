package com.project.goventflow.config;

import org.springframework.ai.document.MetadataMode;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.TokenCountBatchingStrategy;
import org.springframework.ai.openai.OpenAiEmbeddingModel;
import org.springframework.ai.openai.OpenAiEmbeddingOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.retry.RetryUtils;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.mongodb.atlas.MongoDBAtlasVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;


@Configuration
public class MongoConfig {
    @Value("${spring.ai.openai.api-key}")
    private String openAiKey;
    @Value("${spring.data.mongodb.database}")
    private String databaseName;
    @Value("${spring.ai.vectorstore.mongodb.collection-name:vector_store}")
    private String collectionName;
    @Value("${spring.ai.vectorstore.mongodb.indexName:vector_index}")
    private String indexName;
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    @Value("${spring.ai.vectorstore.mongodb.initialize-schema}")
    private Boolean initSchema;

    @Bean
    public EmbeddingModel embeddingModel() {
        OpenAiApi openAiApi = OpenAiApi.builder()
                .apiKey(System.getenv(openAiKey))
                .build();
        return new OpenAiEmbeddingModel(
                openAiApi,
                MetadataMode.EMBED,
                OpenAiEmbeddingOptions.builder()
                        .model("text-embedding-ada-002")
                        .user("user-6")
                        .build(),
                RetryUtils.DEFAULT_RETRY_TEMPLATE);
    }

    @Bean
    public VectorStore mongodbVectorStore(MongoTemplate mongoTemplate, EmbeddingModel embeddingModel) {
        return MongoDBAtlasVectorStore.builder(mongoTemplate, embeddingModel)
                .collectionName("events")
                .vectorIndexName("events_vector_index")
                .pathName("custom_embedding")
                .numCandidates(500)
                .metadataFieldsToFilter(List.of("author", "year"))
                .initializeSchema(true)
                .batchingStrategy(new TokenCountBatchingStrategy())
                .build();
    }
}
