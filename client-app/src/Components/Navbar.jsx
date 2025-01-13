import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; // Kullanıcı oturum kontrolü
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Sosyal medya ikonları
import logo2 from "../assets/logo2.png"; // Logo görseli

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Kullanıcı bilgilerini çekmek için context
  const navigate = useNavigate();

  // Kullanıcı oturumu kapatma
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Linklere hareket efekti tanımlandı
  const linkHoverEffect = {
    whileHover: { scale: 1.1, color: "#00ffcc" },
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.nav
      style={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 75 }}
    >
      {/* Logo */}
      <div style={styles.logo}>
        <Link to="/home">
          <motion.img
            src={logo2}
            alt="Logo"
            style={styles.logoImage}
            whileHover={{ scale: 1.1 }}
          />
        </Link>
      </div>

      {/* Menü Linkleri */}
      <ul style={styles.navLinks}>
        <motion.li {...linkHoverEffect}>
          <Link to="/home" style={styles.link}>
            Ana Sayfa
          </Link>
        </motion.li>
        <motion.li {...linkHoverEffect}>
          <Link to="/about" style={styles.link}>
            Hakkımızda
          </Link>
        </motion.li>

        {/* Simülatörler Dropdown Menüsü */}
        <motion.li
          style={styles.dropdown}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          {...linkHoverEffect}
        >
          <span style={styles.link}>Simülatörler</span>
          {isDropdownOpen && (
            <ul style={styles.dropdownMenu}>
              <motion.li {...linkHoverEffect}>
                <Link to="/simulators/phishing" style={styles.dropdownLink}>
                  Phishing Simulator
                </Link>
              </motion.li>
              <motion.li {...linkHoverEffect}>
                <Link to="/simulators/baiting" style={styles.dropdownLink}>
                  Baiting Simulator
                </Link>
              </motion.li>
            </ul>
          )}
        </motion.li>
        <motion.li {...linkHoverEffect}>
          <Link to="/contact" style={styles.link}>
            İletişim
          </Link>
        </motion.li>
      </ul>

      {/* Kullanıcı Profil/Çıkış Yap */}
      {user ? (
        <motion.div
          style={styles.profile}
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          {...linkHoverEffect}
        >
          <div style={styles.profileIcon}>
            {user.username.charAt(0).toUpperCase()} {/* Kullanıcı isminin ilk harfi */}
          </div>
          {isProfileMenuOpen && (
            <ul style={styles.profileMenu}>
              <li>
                <Link to="/userpanel" style={styles.dropdownLink}>
                  Kullanıcı Paneli
                </Link>
              </li>
              <li onClick={handleLogout} style={styles.dropdownLink}>
                Çıkış Yap
              </li>
            </ul>
          )}
        </motion.div>
      ) : (
        <motion.div {...linkHoverEffect}>
          <Link to="/login" style={styles.loginButton}>
            Giriş Yap
          </Link>
        </motion.div>
      )}

      {/* Sosyal Medya İkonları */}
      <div style={styles.socialIcons}>
        <a href="https://www.facebook.com" target="_blank" style={styles.socialIcon}>
          <FaFacebook style={styles.socialIconImage} />
        </a>
        <a href="https://www.instagram.com" target="_blank" style={styles.socialIcon}>
          <FaInstagram style={styles.socialIconImage} />
        </a>
        <a href="https://www.twitter.com" target="_blank" style={styles.socialIcon}>
          <FaTwitter style={styles.socialIconImage} />
        </a>
      </div>
    </motion.nav>
  );
};

// Stil Tanımları
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    zIndex: 100,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#00ffcc",
  },
  logoImage: {
    height: "40px",
    width: "auto",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    marginRight: "20px",
    fontSize: "16px",
    padding: "8px 12px",
    transition: "color 0.3s",
  },
  dropdown: {
    position: "relative",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#333",
    listStyle: "none",
    padding: "10px 0",
    minWidth: "150px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    borderRadius: "4px",
    zIndex: 9999,
  },
  dropdownLink: {
    color: "#ffffff",
    textDecoration: "none",
    display: "block",
    padding: "8px 20px",
    fontSize: "14px",
    transition: "color 0.3s",
  },
  loginButton: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 12px",
    border: "1px solid #ffffff",
    borderRadius: "4px",
    transition: "all 0.3s",
  },
  profile: {
    position: "relative",
    cursor: "pointer",
  },
  profileIcon: {
    backgroundColor: "#00ffcc",
    color: "#1c1c1c",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  profileMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#333",
    listStyle: "none",
    padding: "10px 0",
    minWidth: "150px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    borderRadius: "4px",
    zIndex: 9999,
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  socialIconImage: {
    fontSize: "20px",
    color: "#ffffff",
  },
};

export default Navbar;