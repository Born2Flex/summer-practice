import ShortEvent from "./ShortEventInterface";

export interface RagAnswerDto {
    answer: string;
    events: ShortEvent[];
}
