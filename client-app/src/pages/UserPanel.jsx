import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserSimulationLogs } from "../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

const UserPanel = () => {
  const { user } = useContext(AuthContext); // Kullanıcı bilgilerini alıyoruz
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        if (user?.id) {
          const logs = await fetchUserSimulationLogs(user.id); // Kullanıcıya ait logları çekiyoruz
          setSimulationLogs(logs || []);
        }
      } catch (err) {
        setError(`Veriler alınırken hata oluştu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  if (!user) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Lütfen giriş yapın.
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={styles.panelContainer}>
      <Typography variant="h4" sx={styles.headerText} gutterBottom>
        Kullanıcı Paneli
      </Typography>
      <Typography variant="h5" sx={styles.headerText} gutterBottom>
        Hoş geldiniz, {user.username}
      </Typography>
      <Typography variant="h6" sx={styles.subHeaderText} gutterBottom>
        Skorunuz: {user.score}
      </Typography>

      {/* Simülasyon Geçmişi */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={styles.subHeaderText}>
          Simülasyon Geçmişiniz
        </Typography>
        <Card sx={{ mt: 2, backgroundColor: "#1e1e1e" }}>
          <CardContent>
            {simulationLogs.length > 0 ? (
              <List sx={styles.simulationList}>
                {simulationLogs.map((log) => (
                  <ListItem key={log.id} divider sx={styles.simulationItem}>
                    <ListItemText
                      primary={
                        <Typography sx={styles.listItemPrimary}>
                          Simülasyon: {log.simulationName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography sx={styles.listItemSecondary}>
                            Tarih: {new Date(log.attemptedOn).toLocaleDateString()}
                          </Typography>
                          <Typography sx={styles.listItemSecondary}>
                            Başarılı: {log.isSuccessful ? "Evet" : "Hayır"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ color: "#A0A0A0" }}>
                Henüz simülasyon geçmişiniz yok.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserPanel;

const styles = {
  panelContainer: {
    padding: "20px",
    backgroundColor: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  headerText: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  simulationList: {
    listStyleType: "none",
    padding: 0,
  },
  simulationItem: {
    borderBottom: "1px solid #444",
    padding: "10px 0",
    marginBottom: "10px",
    color: "#A0A0A0",
  },
  listItemPrimary: {
    color: "#87CEFA",
    fontWeight: "bold",
  },
  listItemSecondary: {
    color: "#A0A0A0",
  },
};
