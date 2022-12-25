import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const Table = () => {
  const [data, setData] = useState([
    {name: 'Ding 1', value: 0},
    {name: 'Ding 2', value: 0},
    {name: 'Ding 3', value: 0},
    {name: 'Ding 4', value: 0},
    {name: 'Ding 5', value: 0},
  ]);

  const handleValueChange = (index, text) => {
    // Erstelle eine Kopie des Arrays data
    const newData = [...data];

    // Aktualisiere den Wert an der gegebenen Stelle
    newData[index].value = text;

    // Setze das aktualisierte Array als neuen Wert von data
    setData(newData);
  };

  return (
    <View>
      {data.map((item, index) => (
        <View style={styles.tableContainer} key={item.name}>
          <Text>{item.name}</Text>
          <TextInput
            value={item.value}
            onChangeText={text => handleValueChange(index, text)}
            style={{width: 50}}
          />
        </View>
      ))}
    </View>
  );
};

const MontlyCosts = () => {
  return (
    <View>
      <Table />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'green',
  },
});

export default MontlyCosts;
