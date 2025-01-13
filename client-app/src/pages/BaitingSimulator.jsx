// BaitingSimulator.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BaitingSimulator = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartSimulation = () => {
    if (user) {
      // Kullanıcı login ise simülasyon sayfasına yönlendir
      navigate("/simulators/baiting/simulation");
    } else {
      // Kullanıcı login değilse login sayfasına yönlendir
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Baiting Saldırıları Nedir?</h1>
        <p style={styles.heroSubtitle}>
          Baiting, kullanıcılara cazip görünen ama aslında zararlı yazılımlar içeren dosya veya bağlantılar sunarak onları tuzağa düşürmeyi amaçlayan bir siber saldırı türüdür.
        </p>
      </div>

      <h2 style={styles.subHeading}>Baiting Nasıl Çalışır?</h2>
      <p style={styles.paragraph}>
        Baiting saldırıları, genellikle kullanıcılara ücretsiz yazılım, çekilişler veya cezalar gibi cazip teklifler sunarak, bu tekliflere tıklamalarını veya bir dosyayı indirmelerini sağlar. Ancak, bu dosyalar kötü amaçlı yazılımlar içerebilir.
      </p>
      
      <h2 style={styles.subHeading}>Baiting Saldırılarından Nasıl Korunabilirsiniz?</h2>
      <ul style={styles.tipsList}>
        <li>Güvenilir olmayan kaynaklardan gelen dosyaları indirmeyin.</li>
        <li>İnternetteki reklamları ve pop-up'ları dikkatlice inceleyin.</li>
        <li>Antivirüs yazılımlarınızı güncel tutun.</li>
        <li>Güvenilir sitelerden yazılım indirmeye özen gösterin.</li>
      </ul>

      {user ? (
        <button onClick={handleStartSimulation} style={styles.simulationButton}>
          Simülasyona Başla
        </button>
      ) : (
        <div style={styles.loginPrompt}>
          <p style={styles.loginText}>Simülasyona başlamak için giriş yapmalısınız.</p>
          <Link to="/login" style={styles.loginButton}>Giriş Yap</Link>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    color: '#c9d1d9',  // Açık gri tonları
    backgroundColor: '#0d1117', // Koyu arka plan
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heroSection: {
    background: 'linear-gradient(45deg, #1f2327, #21262d)', // Daha koyu renk geçişi
    padding: '50px 30px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '15px',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#e1e4e8', // Açık gri
    marginBottom: '30px',
    fontStyle: 'italic',
  },
  subHeading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#b0b0b0', // Yumuşak gri
  },
  paragraph: {
    fontSize: '18px',
    color: '#d1d1d1',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  tipsList: {
    textAlign: 'left',
    listStyleType: 'disc',
    paddingLeft: '40px',
    marginBottom: '40px',
    fontSize: '16px',
    color: '#d1d1d1',
  },
  simulationButton: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#238636', // Yeşil tonları
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '30px',
  },
  simulationButtonHover: {
    backgroundColor: '#3db88f',
  },
  loginPrompt: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#333',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  loginText: {
    fontSize: '16px',
    color: '#f85149', // Kırmızı
    marginBottom: '15px',
  },
  loginButton: {
    padding: '10px 20px',
    color: '#58a6ff', // Soft mavi
    backgroundColor: '#181a1b', // Koyu gri
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'background-color 0.3s ease',
  },
  loginButtonHover: {
    backgroundColor: '#58a6ff',
    color: '#181818',
  },
};

export default BaitingSimulator;
