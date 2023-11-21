import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import api from "../../util/api";
import { InteresseModel } from "../../Model/Interesse.model";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 15,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    padding: 10,
    flexGrow: 1,
    fontSize: 12,

  },
  header: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default function ExibirPDF() {
  const [listaInteresses, setListaInteresses] = useState<InteresseModel[]>([]);

  useEffect(() => {
    listarInteresses();
  }, []);

  function listarInteresses() {
    api.get("/interests").then((resp) => {
      setListaInteresses(resp.data.content);
    });
  }

  return (
    <PDFViewer width="100%" height="800">
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Lista de clientes interessados</Text>

            <View style={styles.page}>
              <Text style={styles.text}>Nome</Text>
              <Text style={styles.text}>Telefone</Text>
              <Text style={styles.text}>Data de interesse</Text>
              <Text style={styles.text}>Carro</Text>
              <Text style={styles.text}>Ativo</Text>

            </View>
            {listaInteresses.map((e) => (
              <View style={styles.page} key={e.id}>
                <Text style={styles.text}>{e.nome}</Text>
                <Text style={styles.text}>{e.telefone}</Text>
                <Text style={styles.text}>{e.dataInteresse}</Text>
                <Text style={styles.text}>{e.carro.marca} {e.carro.modelo}</Text>
                <Text style={styles.text}>{e.ativo ? 'Sim' : 'Não'}</Text>

              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
