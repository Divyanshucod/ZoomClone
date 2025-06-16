import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Meeting = () => {
    const { id: meetingId } = useParams();
    const [peerId, setPeerId] = useState("");
    const [targetPeerId, setTargetPeerId] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("Initializing...");
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerInstance = useRef<Peer | null>(null);
    const localStream = useRef<MediaStream | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                setConnectionStatus("Getting camera access...");
                
                // 1. Get media with explicit constraints
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 640, height: 480 }, 
                    audio: true 
                });
                
                console.log("Local Stream Tracks:", stream.getTracks());
                console.log("Video track enabled:", stream.getVideoTracks()[0]?.enabled);
                
                localStream.current = stream;
                
                // 2. Set up local video with proper event handling
                if (myVideoRef.current) {
                    myVideoRef.current.srcObject = stream;
                    
                    // Add event listeners for debugging
                    myVideoRef.current.onloadedmetadata = () => {
                        console.log("Local video metadata loaded");
                        myVideoRef.current?.play().catch((err) => 
                            console.error("Local video autoplay failed:", err)
                        );
                    };
                    
                    myVideoRef.current.oncanplay = () => {
                        console.log("Local video can play");
                        setConnectionStatus("Camera ready");
                    };
                    
                    myVideoRef.current.onerror = (e) => {
                        console.error("Local video error:", e);
                    };
                }
                
                // 3. Init Peer
                setConnectionStatus("Connecting to peer network...");
                const peer = new Peer();
                peerInstance.current = peer;
                
                peer.on("open", (id) => {
                    setPeerId(id);
                    setConnectionStatus("Ready to connect");
                    console.log("My peer ID is: " + id);
                });
                
                peer.on("error", (err) => {
                    console.error("Peer error:", err);
                    setConnectionStatus(`Peer error: ${err.message}`);
                });
                
                // 4. Handle incoming call
                peer.on("call", (call) => {
                    console.log("Incoming call received");
                    setConnectionStatus("Answering incoming call...");
                    
                    call.answer(stream);
                    
                    call.on("stream", (remoteStream) => {
                        console.log("Remote stream received:", remoteStream.getTracks());
                        setConnectionStatus("Connected");
                        
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                            
                            remoteVideoRef.current.onloadedmetadata = () => {
                                console.log("Remote video metadata loaded");
                                remoteVideoRef.current?.play().catch((err) => 
                                    console.error("Remote video autoplay failed:", err)
                                );
                            };
                            
                            remoteVideoRef.current.onerror = (e) => {
                                console.error("Remote video error:", e);
                            };
                        }
                    });
                    
                    call.on("error", (err) => {
                        console.error("Call error:", err);
                        setConnectionStatus(`Call error: ${err.message}`);
                    });
                });
                
            } catch (error:any) {
                console.error("Initialization error:", error);
                setConnectionStatus(`Error: ${error.message}`);
            }
        };

        init();
        
        // Cleanup function
        return () => {
            if (localStream.current) {
                localStream.current.getTracks().forEach(track => track.stop());
            }
            if (peerInstance.current) {
                peerInstance.current.destroy();
            }
        };
    }, []);

    const callPeer = () => {
        if (!targetPeerId.trim()) {
            alert("Please enter a peer ID");
            return;
        }
        
        if (!peerInstance.current || !localStream.current) {
            alert("Peer not ready or no local stream");
            return;
        }
        
        console.log("Calling peer:", targetPeerId);
        setConnectionStatus("Calling...");
        
        const call = peerInstance.current.call(targetPeerId, localStream.current);
        
        if (call) {
            call.on("stream", (remoteStream) => {
                console.log("Remote stream received from outgoing call:", remoteStream.getTracks());
                setConnectionStatus("Connected");
                
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                    
                    remoteVideoRef.current.onloadedmetadata = () => {
                        console.log("Remote video metadata loaded (outgoing call)");
                        remoteVideoRef.current?.play().catch((err) => 
                            console.error("Remote video autoplay failed:", err)
                        );
                    };
                }
            });
            
            call.on("error", (err) => {
                console.error("Outgoing call error:", err);
                setConnectionStatus(`Call failed: ${err.message}`);
            });
        }
    };

    return (
      <div style={{ padding: '20px' }}>
      <h2>Meeting ID: {meetingId}</h2>
      <h2>Member ID: {peerId}</h2>
      <p>Status: {connectionStatus}</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div>
              <h3>Your Video</h3>
              <video 
                  ref={myVideoRef} 
                  autoPlay 
                  muted 
                  playsInline
                  width={300} 
                  height={225}
                  style={{ 
                      backgroundColor: 'black',
                      border: '1px solid #ccc',
                      borderRadius: '8px'
                  }}
              />
          </div>
          
          <div>
              <h3>Remote Video</h3>
              <video 
                  ref={remoteVideoRef} 
                  autoPlay 
                  playsInline
                  width={300} 
                  height={225}
                  style={{ 
                      backgroundColor: 'black',
                      border: '1px solid #ccc',
                      borderRadius: '8px'
                  }}
              />
          </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
              type="text"
              placeholder="Enter Peer ID to call"
              value={targetPeerId}
              onChange={(e) => setTargetPeerId(e.target.value)}
              style={{ padding: '8px', width: '200px' }}
          />
          <button 
              onClick={callPeer}
              style={{ padding: '8px 16px' }}
          >
              Call
          </button>
          <button 
              onClick={() => {
                  // Force play both videos on user interaction
                  myVideoRef.current?.play().catch(console.error);
                  remoteVideoRef.current?.play().catch(console.error);
              }}
              style={{ padding: '8px 16px', marginLeft: '10px' }}
          >
              Force Play Videos
          </button>
      </div>
  </div>
    );
};

export default Meeting;



 //     try {
        //       await axios.post('http://localhost:3000/api/v1/connection/join-meeting', {
        //          meetingId,
        //          username: localStorage.getItem('username'),
        //          memberId:peerId
        //      },{
        //          headers: {
        //              Authorization:`Bearer ${localStorage.getItem('AuthToken')}`
        //          }
        //      })
        //  } catch (error:any) {
        //      alert(error.response.data.message)
        //      navigate('/signin');
        //  }