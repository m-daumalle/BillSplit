import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const calculateTotalIncome = (income1, income2) => {
  return income1 + income2;
};

const calculatePercentage = (income, total) => {
  return (income / total) * 100;
};

const calculateTotalCosts = (cost1, cost2, cost3, cost4, cost5) => {
  return cost1 + cost2 + cost3 + cost4 + cost5;
};

const calculateBills = (totalCosts, incomePerc) => {
  return totalCosts * (incomePerc / 100);
};
// const calculateBills = (totalCosts, incomePerc1) => {
//   return totalCosts * (incomePerc1 / 100);
// };

function IncomeInputForm() {
  /// Navigation start
  const [currentPage, setCurrentPage] = useState('home');

  function goToMonthlyCost() {
    setCurrentPage('monthlyCost');
  }
  /// Navigation end

  /// Start Code für Monthly Cost Page

  const [costs, setCosts] = useState(
    storage.getString('costs')
      ? JSON.parse(storage.getString('costs'))
      : {
          Cost1: 0,
          Cost2: 0,
          Cost3: 0,
          Cost4: 0,
          Cost5: 0,
          totalCosts: 0,
        },
  );

  const bills = storage.getString('bills')
    ? JSON.parse(storage.getString('bills'))
    : {
        billsP1: 0,
        billsP2: 0,
      };

  const [txtcost1, setCost1] = useState(
    costs.cost1 ? costs.cost1.toString() : '',
  );
  const [txtcost2, setCost2] = useState(
    costs.cost2 ? costs.cost2.toString() : '',
  );
  const [txtcost3, setCost3] = useState(
    costs.cost3 ? costs.cost3.toString() : '',
  );
  const [txtcost4, setCost4] = useState(
    costs.cost4 ? costs.cost4.toString() : '',
  );
  const [txtcost5, setCost5] = useState(
    costs.cost5 ? costs.cost5.toString() : '',
  );

  const [billsP1, setBillsP1] = useState(bills.billsP1 ? bills.billsP1 : 0);
  const [billsP2, setBillsP2] = useState(bills.billsP2 ? bills.billsP2 : 0);

  const saveCosts = () => {
    if (
      isNaN(txtcost1) &&
      isNaN(txtcost2) &&
      isNaN(txtcost3) &&
      isNaN(txtcost4) &&
      isNaN(txtcost5)
    ) {
      console.log('Text is not a number');
      console.log(txtcost1);
      console.log(txtcost2);
      console.log(txtcost3);
      console.log(txtcost4);
      console.log(txtcost5);
      return;
    }
    const cost1 = Number(txtcost1);
    const cost2 = Number(txtcost2);
    const cost3 = Number(txtcost3);
    const cost4 = Number(txtcost4);
    const cost5 = Number(txtcost5);
    const totalCosts = calculateTotalCosts(cost1, cost2, cost3, cost4, cost5);

    setCosts({
      cost1,
      cost2,
      cost3,
      cost4,
      cost5,
      totalCosts,
    });

    console.log({
      cost1,
      cost2,
      cost3,
      cost4,
      cost5,
      totalCosts,
    });

    storage.set(
      'costs',
      JSON.stringify({
        cost1,
        cost2,
        cost3,
        cost4,
        cost5,
        totalCosts,
      }),
    );
  };
  /// Ende Code Für Monthly Cost Page
  const [textIncome1, setTextIncome1] = useState();
  const [textIncome2, setTextIncome2] = useState();

  const [income, setIncome] = useState(
    storage.getString('income')
      ? JSON.parse(storage.getString('income'))
      : {
          incomePerc1: 0,
          incomePerc2: 0,
          totalIncome: 0,
        },
  );

  const handlePress = () => {
    if (isNaN(textIncome1) || isNaN(textIncome2)) {
      console.log('Text is not a number');
      return;
    }
    const income1 = Number(textIncome1);
    const income2 = Number(textIncome2);
    const totalIncome = calculateTotalIncome(income1, income2);
    const incomePerc1 = calculatePercentage(income1, totalIncome);
    const incomePerc2 = calculatePercentage(income2, totalIncome);

    setIncome({
      incomePerc1,
      incomePerc2,
      totalIncome,
      income1,
      income2,
    });

    storage.set(
      'income',
      JSON.stringify({
        incomePerc1,
        incomePerc2,
        totalIncome,
        income1,
        income2,
      }),
    );
  };

  // const oldIcom = {...income};
  // oldIcom.incomePerc1 = 240;
  // setIncome(oldIcom);
  if (currentPage === 'home') {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Bills Calculator</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 15,
          }}>
          <View>
            <TextInput
              style={styles.incomeContainer}
              placeholder="Type in new Income"
              value={textIncome1}
              onChangeText={text => setTextIncome1(text)}
            />
            <Text style={styles.incomeSideText}>
              Person 1: {income.income1}€
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.incomeContainer}
              placeholder="Type in new Income"
              value={textIncome2}
              onChangeText={text => setTextIncome2(text)}
            />
            <Text style={styles.incomeSideText}>
              Person 2: {income.income2}€
            </Text>
          </View>
        </View>
        <View style={{padding: 15}}>
          <Button title="Calculate Total Income" onPress={handlePress} />
        </View>

        <Text style={styles.totalIncomeContainer}>
          Total income: {income.totalIncome}€ per Month
        </Text>
        <Text style={styles.totalIncomeContainer}>
          Income percentage Person 1: {income.incomePerc1?.toFixed(1)}%
        </Text>
        <Text style={styles.totalIncomeContainer}>
          Income percentage Person 2: {income.incomePerc2?.toFixed(1)}%
        </Text>
        <View
          style={{
            height: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginBottom: 40,
          }}
        />
        <View>
          <Text style={styles.totalIncomeContainer}>
            Total Monthly Costs: {costs.totalCosts}€
          </Text>
        </View>
        <View style={{padding: 15}}>
          <Button title="Manage Monthly costs" onPress={goToMonthlyCost} />
        </View>
        <View>
          <Text style={styles.totalIncomeContainer}>
            Person 1 has to pay: {billsP1?.toFixed(2)}€
          </Text>
        </View>
        <View>
          <Text style={styles.totalIncomeContainer}>
            Person 2 has to pay: {billsP2?.toFixed(2)}€
          </Text>
        </View>
        <View style={{padding: 15}}>
          <Button
            title="Calculate Bills"
            onPress={() => {
              setBillsP1(calculateBills(costs.totalCosts, income.incomePerc1));
              setBillsP2(calculateBills(costs.totalCosts, income.incomePerc2));
              storage.set(
                'bills',
                JSON.stringify({
                  billsP1: calculateBills(costs.totalCosts, income.incomePerc1),
                  billsP2: calculateBills(costs.totalCosts, income.incomePerc2),
                }),
              );
            }}
          />
        </View>
      </View>
    );
  } else if (currentPage === 'monthlyCost') {
    return (
      <View>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>Rent:</Text>
            <TextInput
              style={styles.input}
              placeholder="Costs in €"
              value={txtcost1}
              onChangeText={text => setCost1(text)}
            />
          </View>
          <View style={styles.oddRow}>
            <Text style={styles.text}>Insurance:</Text>
            <TextInput
              placeholder="Costs in €"
              value={txtcost2}
              onChangeText={text => setCost2(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Car:</Text>
            <TextInput
              placeholder="Costs in €"
              value={txtcost3}
              onChangeText={text => setCost3(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.oddRow}>
            <Text style={styles.text}>Abos:</Text>
            <TextInput
              placeholder="Costs in €"
              value={txtcost4}
              onChangeText={text => setCost4(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Special:</Text>
            <TextInput
              placeholder="Costs in €"
              value={txtcost5}
              onChangeText={text => setCost5(text)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={{padding: 15}}>
          <Button title="Save" onPress={saveCosts} />
        </View>
        <View>
          <Button title="Go Back" onPress={() => setCurrentPage('home')} />
        </View>
      </View>
    );
  }
}

/// ------------ here starts the Stylesheets ----------
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  oddRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 25,
  },
  input: {
    width: 200,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 25,
  },
  headerContainer: {
    padding: 15,
  },
  headerText: {
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  incomeContainer: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'grey',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  totalIncomeContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
  },
  incomeSideText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'lightgray ',
    textAlign: 'center',
  },
  red: {
    color: 'red',
  },
});

export default IncomeInputForm;
