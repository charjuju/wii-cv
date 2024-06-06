// Peer.js

import Peer from 'peerjs';
import React, { useEffect, useState } from 'react';

const PeerComponent = ({ id, onData }) => {
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const initializePeer = async () => {
      const peer = new Peer(id, {
        host: 'localhost', // Mettez votre propre serveur PeerJS ici
        port: 9000, // Mettez votre propre port
        path: '/myapp',
      });

      peer.on('open', () => {
        console.log('Peer ID:', peer.id);
        setPeer(peer);
      });

      peer.on('connection', (conn) => {
        conn.on('data', onData);
      });

      return () => {
        peer.disconnect();
      };
    };

    initializePeer();

    // Cleanup function
    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [id, onData]);

  const connectToPeer = (peerId) => {
    if (!peer) return;
    const conn = peer.connect(peerId);
    conn.on('open', () => {
      console.log('Connected to peer:', conn.peer);
    });
  };

  return (
    <div>
      <h2>Peer Component</h2>
      <button onClick={() => connectToPeer('peer_id_of_other_user')}>
        Connect to Peer
      </button>
    </div>
  );
};

export default PeerComponent;
