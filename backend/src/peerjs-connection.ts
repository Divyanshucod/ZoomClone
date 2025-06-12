import { PeerServer } from 'peer';

export function createPeerServer(server: any) {
  const peerServer = PeerServer({ path: "/peerjs" });
  server.on("request", peerServer); // Or use app.use if needed
  console.log("PeerJS signaling server is attached");
  return peerServer;
}
