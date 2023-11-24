export class WebRTCConnectionSession extends RTCPeerConnection{
    connectedTo: string;
    sender: any;
    stream: MediaStream | null;
    localMuted: boolean;
    remoteMuted: boolean;
    remoteFullMute: boolean;
    outgoingDataChannel: any;
    incomingDataChannel: any;

    constructor(servers: any, connectedTo = '') {
        super(servers);
        this.connectedTo = connectedTo;
        this.stream = null;
        this.localMuted = false;
        this.remoteMuted = false;
        this.remoteFullMute = false;
        this.incomingDataChannel = null;
        this.outgoingDataChannel = null;
    }
}