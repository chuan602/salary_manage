import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
export default class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.InfoBox}>
                    <View style={styles.col1}>
                        <View style={styles.Name}>
                            <Text numberOfLines={1} style={styles.NameText}>
                                {this.props.name}
                            </Text>
                        </View>
                        <View style={styles.Id}>
                            <Text numberOfLines={1}>工号：{this.props.id}</Text>
                        </View>
                    </View>
                    <View style={styles.col2}>
                        <View style={styles.Gender}>
                            <Text style={styles.Text}>{this.props.gender}</Text>
                        </View>
                        <View style={styles.Age}>
                            <Text style={styles.Text}>{this.props.age}</Text>
                        </View>
                    </View>
                    <View style={styles.col3}>
                        <View style={styles.Department}>
                            <Text style={styles.Text} numberOfLines={1}>
                                {this.props.department}
                            </Text>
                        </View>
                        <View style={styles.Job}>
                            <Text style={styles.Text} numberOfLines={2}>{this.props.job}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.SalaryBox}>
                    <Text numberOfLines={1} style={styles.SalaryText}>
                        ￥{this.props.salary}
                    </Text>
                </View>
                <View style={styles.ToolBox}>
                    <Button title="编辑" color="#2196f3" onPress={() => {
                        this.props.navigation.navigate('EditItem', {
                            id: this.props.id,
                            name: this.props.name,
                            gender: this.props.gender,
                            age: this.props.age,
                            department: this.props.department,
                            job: this.props.job,
                            salary: this.props.salary
                        })
                    }}/>
                    <Button
                        title="删除"
                        color="#ff0000"
                        onPress={() => {
                            Alert.alert(
                                "Confirm",
                                `您确定要删除 ${this.props.name} 的工资信息吗？`,
                                [
                                    {
                                        text: "让我再想想",
                                        onPress: () => {},
                                        style: "cancel"
                                    },
                                    {
                                        text: "删除",
                                        onPress: () => {
                                            this.props.handleDelete(
                                                this.props.id
                                            );
                                        }
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        flex: 1
    },
    InfoBox: {
        flexDirection: "row",
        flex: 3
    },
    Name: {
        justifyContent: "center",
        flex: 1
    },
    Id: {
        justifyContent: "center",
        flex: 1
    },
    Gender: {
        justifyContent: "center",
        flex: 1
    },
    Age: {
        justifyContent: "center",
        flex: 1
    },
    Department: {
        justifyContent: "center",
        flex: 1
    },
    Job: {
        justifyContent: "center",
        flex: 1
    },
    NameText: {
        color: "#444",
        fontWeight: "500",
        fontSize: 25
    },
    col1: {
        height: "100%",
        width: 90
    },
    col2: {
        flex: 1,
        height: "100%",
        justifyContent: 'center'
    },
    col3: {
        flex: 2,
        height: "100%",
        justifyContent: 'center'
    },
    SalaryBox: {
        flex: 2,
        justifyContent: "center"
    },
    SalaryText: {
        textAlign: "center",
        textAlignVertical: "center",
        includeFontPadding: false,
        color: "green",
        fontWeight: "600",
        fontSize: 25
    },
    ToolBox: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    Text: {
        textAlign: 'center'
    }
});
