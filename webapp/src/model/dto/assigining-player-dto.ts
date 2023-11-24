import {Player} from "@/model/player.model";
import {AssignmentDto} from "@/model/dto/assignment-dto";


export class AssigningPlayerDTO extends Player{

    assignment: AssignmentDto;

    constructor(init: Partial<Player>, assignment: AssignmentDto) {
        super(init);
        this.assignment = assignment;
    }
}