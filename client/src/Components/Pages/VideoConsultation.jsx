import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SimplePeer from "simple-peer";
import io from "socket.io-client";
import "../CSS/VideoConsultation.css";

const socket = io("http://localhost:5001");

const VideoConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [blockchainTx, setBlockchainTx] = useState("");
  const userVideo = useRef();
  const peerVideo = useRef();
  const peerRef = useRef();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/consultations");
        if (Array.isArray(res.data)) setDoctors(res.data);
        else throw new Error("Invalid data format received.");
      } catch (error) {
        setErrorMessage("Failed to fetch doctors.");
      }
    };
    fetchDoctors();
  }, []);

  const startConsultation = async () => {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/consultations", {
        doctorName: selectedDoctor.doctorName,
        specialty: selectedDoctor.specialty,
        patientName: "John Doe",
        consultationDate: new Date().toISOString().split("T")[0],
        consultationTime: new Date().toLocaleTimeString(),
      });

      setBlockchainTx(response.data.blockchainTx);
      setConsultationStarted(true);
      startVideoCall();
    } catch {
      setErrorMessage("Failed to start consultation.");
    }
  };

  const startVideoCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    userVideo.current.srcObject = stream;

    const peer = new SimplePeer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => socket.emit("offer", data));
    peer.on("stream", (peerStream) => (peerVideo.current.srcObject = peerStream));

    socket.on("answer", (data) => peer.signal(data));
    socket.on("ice-candidate", (candidate) => peer.addIceCandidate(candidate));
    
    peerRef.current = peer;
  };

  return (
    <div className="video-consultation-container">
      <h2>Online Doctor Video Consultations</h2>
      {blockchainTx && <p>Blockchain Transaction: {blockchainTx}</p>}
      {!consultationStarted ? (
        <div className="doctor-selection">
          <h3>Select a Doctor</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {doctors.map((doctor) => (
            <button key={doctor._id} onClick={() => setSelectedDoctor(doctor)}>
              {doctor.doctorName} - {doctor.specialty}
            </button>
          ))}
          <button onClick={startConsultation}>Start Consultation</button>
        </div>
      ) : (
        <div className="consultation-room">
          <video ref={userVideo} autoPlay playsInline />
          <video ref={peerVideo} autoPlay playsInline />
          <button onClick={() => setConsultationStarted(false)}>End Consultation</button>
        </div>
      )}
    </div>
  );
};

export default VideoConsultation;
