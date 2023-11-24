import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";
import {VoteDTO} from "@/model/dto/vote-dto.model";


export class BanPollDto {
    initiatedBy: string;
    banCandidate: string;
    banPollTimeOut: WtfiTimerDto;
    voteRatio: {
        votesCount: number,
        allPlayersCount: number
    };
    result: {
        yes: number,
        no: number
    };
    closed: boolean;
    reason: string;
    votes: VoteDTO[];

    constructor(init: BanPollDto) {
        this.initiatedBy = init.initiatedBy;
        this.banCandidate = init.banCandidate;
        this.banPollTimeOut = init.banPollTimeOut;
        this.voteRatio = init.voteRatio;
        this.result = init.result;
        this.closed = init.closed;
        this.reason = init.reason;
        this.votes = init.votes;
    }
}