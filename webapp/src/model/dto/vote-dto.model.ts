export class VoteDTO {
    voterId: string;
    decision: boolean

    constructor(init: VoteDTO) {
      this.voterId = init.voterId;
      this.decision = init.decision;
    }


}