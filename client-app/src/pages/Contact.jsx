import React from 'react';

const Contact = () => {
  return (
    <div style={styles.container}>
      <div style={styles.slider}>
        <h2 style={styles.sliderTitle}>Bize Ulaşın</h2>
        <p style={styles.sliderText}>Herhangi bir sorunuz, öneriniz veya iş birliği için bize ulaşabilirsiniz.</p>
      </div>
      <div style={styles.aboutContent}>
        <form style={styles.form}>
          <label style={styles.label}>Adınız</label>
          <input type="text" placeholder="Adınızı giriniz" style={styles.input} />
          
          <label style={styles.label}>E-posta</label>
          <input type="email" placeholder="E-posta adresinizi giriniz" style={styles.input} />
          
          <label style={styles.label}>Mesajınız</label>
          <textarea placeholder="Mesajınızı buraya yazın" style={styles.textarea}></textarea>
          
          <button type="submit" style={styles.button}>Gönder</button>
        </form>
        <div style={styles.info}>
          <p><strong>E-posta:</strong> iletisim@cyberapp.com</p>
          <p><strong>Telefon:</strong> +90 555 555 55 55</p>
          <p><strong>Adres:</strong> CyberApp Ofisi, İstanbul, Türkiye</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    padding: "20px",
  },
  slider: {
    backgroundColor: "#141e30",
    textAlign: "center",
    padding: "50px 0",
    marginBottom: "20px",
  },
  sliderTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#58a6ff",
  },
  sliderText: {
    fontSize: "1.2rem",
    color: "#8b949e",
    marginTop: "10px",
  },
  aboutContent: {
    margin: "0 auto",
    maxWidth: "800px",
    textAlign: "left",
    lineHeight: "1.6",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#161b22",
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '30px',
  },
  label: {
    fontSize: '1.1rem',
    marginBottom: '8px',
    color: '#c9d1d9',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #58a6ff',
    outline: 'none',
    color: '#fff',
    backgroundColor: '#161b22',
  },
  textarea: {
    padding: '12px',
    marginBottom: '15px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #58a6ff',
    outline: 'none',
    color: '#fff',
    backgroundColor: '#161b22',
    resize: 'none',
    height: '120px',
  },
  button: {
    padding: '12px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    color: '#121212',
    backgroundColor: '#58a6ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  info: {
    fontSize: '1rem',
    color: '#c9d1d9',
    lineHeight: '1.6',
    textAlign: 'center',
  },
};

export default Contact;
