import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";

/* Importando os recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";

export default function App() {
  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissoes de uso (atráves de hook useCameraPermission) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  /* Ao entrar no app, será executada a verificação de permissões de uso */
  useEffect(() => {
    /* Esta função mostrará um pop-up para o usuário perguntando se ele autoriza a utilização do recurso móvel (no caso, selecionar/tirar foto) */
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    verificaPermissoes();
  }, []);

  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  console.log(foto);

  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" onPress={escolherFoto} />
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
