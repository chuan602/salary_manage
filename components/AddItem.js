import React, { Component } from "react";
import { View, StyleSheet, Button, ToastAndroid } from "react-native";
import { Isao } from "react-native-textinput-effects";
import axios from "../axios/config";

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: 0,
            gender: "男",
            department: "",
            job: "",
            salary: 0
        };
    }

    static navigationOptions = {
        title: "添加职工信息",
        headerStyle: {
            backgroundColor: "#2196f3"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontSize: 20,
            letterSpacing: 2,
            fontWeight: "600"
        }
    };

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.InputBox}>
                    <Isao
                        label={"姓名"}
                        activeColor={"#2196f3"}
                        borderHeight={5}
                        inputPadding={16}
                        labelHeight={24}
                        passiveColor={"green"}
                        onChangeText={text => {
                            this.setState({ name: text });
                        }}
                    />
                    <Isao
                        label={"年龄"}
                        activeColor={"#2196f3"}
                        borderHeight={5}
                        inputPadding={16}
                        labelHeight={24}
                        passiveColor={"green"}
                        onChangeText={text => {
                            this.setState({ age: text });
                        }}
                    />
                    <Isao
                        label={"部门"}
                        activeColor={"#2196f3"}
                        borderHeight={5}
                        inputPadding={16}
                        labelHeight={24}
                        passiveColor={"green"}
                        onChangeText={text => {
                            this.setState({ department: text });
                        }}
                    />
                    <Isao
                        label={"职位"}
                        activeColor={"#2196f3"}
                        borderHeight={5}
                        inputPadding={16}
                        labelHeight={24}
                        passiveColor={"green"}
                        onChangeText={text => {
                            this.setState({ job: text });
                        }}
                    />
                    <Isao
                        label={"姓别"}
                        activeColor={"#2196f3"}
                        borderHeight={5}
                        inputPadding={16}
                        labelHeight={24}
                        passiveColor={"green"}
                        onChangeText={text => {
                            this.setState({ gender: text });
                        }}
                    />
                    <Isao
                        label={"工资"}
                        activeColor={"#2196f3"}
                        borderHeight={5}
                        inputPadding={16}
                        labelHeight={24}
                        passiveColor={"green"}
                        onChangeText={text => {
                            this.setState({ salary: text });
                        }}
                    />
                </View>
                <Button
                    title="添加"
                    style={{ letterSpacing: "3" }}
                    onPress={() => {
                        axios
                            .post("/add", {
                                name: this.state.name,
                                age: this.state.age,
                                gender: this.state.gender,
                                department: this.state.department,
                                job: this.state.job,
                                salary: this.state.salary
                            })
                            .then(res => {
                                this.props.navigation.navigate("Home",{update: true});
                            })
                            .catch(err => {
                                ToastAndroid.showWithGravity(
                                    '添加职工信息失败！',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                );
                            });
                    }}
                    color="#2196f3"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        padding: 20,
        width: "100%",
        justifyContent: "center"
    },
    InputBox: {
        marginBottom: 20
    }
});

export default AddItem;
