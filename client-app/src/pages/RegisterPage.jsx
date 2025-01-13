import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(300); // 5 dakika = 300 saniye
  const [isVerified, setIsVerified] = useState(false);

  // Geri sayım başlatma
  useEffect(() => {
    let countdown;
    if (codeSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setMessage("Doğrulama süresi doldu. Lütfen kodu yeniden isteyin.");
    }

    return () => clearInterval(countdown);
  }, [codeSent, timer]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    try {
      const response = await fetch('http://localhost:5079/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });
  
      if (response.ok) {
        setMessage('Kayıt başarılı! Doğrulama kodu e-posta adresinize gönderildi.');
        setCodeSent(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (err) {
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5079/api/user/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          verificationCode,
        }),
      });

      if (response.ok) {
        setIsVerified(true);
        setMessage("Doğrulama başarılı! Hesabınız kaydedildi.");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Geçersiz doğrulama kodu.");
      }
    } catch (error) {
      setError("Doğrulama sırasında bir hata oluştu.");
    }
  };

  const handleResendCode = async () => {
    setError('');
    setMessage('');
    try {
      const response = await fetch('http://localhost:5079/api/user/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Doğrulama kodu tekrar gönderildi.");
        setTimer(300); // 5 dakikalık süreyi sıfırla
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Kod yeniden gönderilemedi.");
      }
    } catch (error) {
      setError("Kod gönderme işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={styles.container}
      >
        {/* Hesap Oluştur kısmı en üste taşındı */}
        <h2 style={styles.title}>Hesap Oluştur</h2>
        <motion.form
          onSubmit={handleRegister}
          style={styles.form}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <label style={styles.label}>Ad</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ scale: 1.1, backgroundColor: "#1e90ff" }}
            whileTap={{ scale: 0.95 }}
          >
            Kayıt Ol
          </motion.button>
        </motion.form>

        {/* Doğrulama kısmı sağ tarafta */}
        {codeSent && !isVerified && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={styles.verificationContainer}
          >
            <h3 style={styles.title}>Doğrulama Kodu</h3>
            <p style={styles.timer}>Kalan süre: {Math.floor(timer / 60)}:{timer % 60}</p>
            <form onSubmit={handleVerification} style={styles.form}>
              <label style={styles.label}>Doğrulama Kodu</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={styles.input}
                required
              />
              <motion.button
                type="submit"
                style={styles.button}
                whileHover={{ scale: 1.1, backgroundColor: "#1e90ff" }}
                whileTap={{ scale: 0.95 }}
              >
                Kodu Doğrula
              </motion.button>
            </form>

            {timer === 0 && (
              <p style={styles.error}>
                Kod gelmedi mi?{" "}
                <button onClick={handleResendCode} style={styles.link}>
                  Kodu Yeniden Gönder
                </button>
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const styles = {
  page: {
    position: 'relative',
    height: '100vh',
    background: `url('https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover`,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '20px',
    color: '#ffffff',
  },
  title: {
    color: '#1e90ff',
    marginBottom: '20px',
    fontSize: '32px',
    textShadow: '0 0 12px #1e90ff, 0 0 24px #1e90ff',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  input: {
    marginBottom: '20px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #1e90ff', // Mavi kenarlık
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Arka plan rengi koyu
    color: '#fff',
    outline: 'none',
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '20px',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-100%)',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#1e90ff',
  },
  error: {
    color: '#ff4d4d',
    marginBottom: '20px',
  },
  button: {
    padding: '12px',
    fontSize: '18px',
    borderRadius: '8px',
    border: 'none',
    color: '#121212',
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  registerButton: {
    marginTop: '20px',
    padding: '12px',
    fontSize: '18px',
    borderRadius: '8px',
    border: 'none',
    color: '#121212',
    backgroundColor: '#ffa500',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  verificationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
    maxWidth: '400px',
    width: '100%',
    position: 'absolute',  // Sağda konumlandırma
    right: '20px',
  },
  link: {
    color: 'lightblue',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
};




export default RegisterPage;
