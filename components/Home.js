import React, { Component } from "react";
import {
    Text,
    View,
    Picker,
    StyleSheet,
    FlatList,
    Image,
    ToastAndroid,
    TouchableOpacity
} from "react-native";
import ListItem from "./ListItem";
import SeparatorLine from "./SeparatorLine";
import axios from "../axios/config";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            refreshing: false,
            salarySort: "-工资排序-",
            ageSort: "-年龄排序-"
        };
        this.getInitList = this.getInitList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.ageSortChange = this.ageSortChange.bind(this);
        this.updateListBySort = this.updateListBySort.bind(this);
        this.props.navigation.addListener("willFocus", () => {
            if (this.props.navigation.getParam("update")) {
                this.getInitList();
                this.setState({
                    salarySort: "-工资排序-",
                    ageSort: "-年龄排序-"
                });
            }
        });
    }

    static navigationOptions = ({ navigation }) => ({
        title: "职工工资管理",
        headerStyle: {
            backgroundColor: "#2196f3",
            paddingEnd: 10
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontSize: 20,
            letterSpacing: 2,
            fontWeight: "600"
        },
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("AddItem", { update: false });
                }}
            >
                <Image
                    style={styles.AddImg}
                    source={require("../assets/img/add.png")}
                />
            </TouchableOpacity>
        )
    });

    getInitList() {
        axios
            .get("/list")
            .then(res => {
                this.setState(() => ({
                    list: res.data,
                    refreshing: false
                }));
            })
            .catch(err => {
                throw err;
            });
    }

    componentDidMount() {
        //初始化数据
        this.getInitList();
    }
    handleDelete(id) {
        _this = this;
        axios
            .post("/delete", { id })
            .then(res => {
                ToastAndroid.showWithGravity(
                    "删除成功！",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                _this.getInitList();
            })
            .catch(err => {
                ToastAndroid.showWithGravity(
                    "ERROR！删除失败！",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            });
    }

    updateListBySort(sort, field) {
        axios
            .post("/sort", { sort, field })
            .then(res => {
                this.setState({
                    list: res.data
                });
            })
            .catch(err => {
                ToastAndroid.showWithGravity(
                    "ERROR！排序失败！",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            });
    }

    ageSortChange(itemValue) {
        this.setState({ ageSort: itemValue });
        switch (itemValue) {
            case "升序":
                this.setState({ salarySort: "-工资排序-" });
                this.updateListBySort(1, "age");
                break;
            case "降序":
                this.setState({ salarySort: "-工资排序-" });
                this.updateListBySort(0, "age");
                break;
            default:
                break;
        }
    }

    salarySortChange(itemValue) {
        this.setState({ salarySort: itemValue });
        switch (itemValue) {
            case "升序":
                this.setState({ ageSort: "-工资排序-" });
                this.updateListBySort(1, "salary");
                break;
            case "降序":
                this.setState({ ageSort: "-工资排序-" });
                this.updateListBySort(0, "salary");
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.sortBox}>
                    <View style={styles.Label}>
                        <Text style={styles.LabelText}>排序方式：</Text>
                    </View>
                    <View style={styles.PickerBox}>
                        <Picker
                            style={{ height: 50, width: 120, color: "#666" }}
                            mode="dropdown"
                            selectedValue={this.state.ageSort}
                            onValueChange={itemValue => {
                                this.ageSortChange(itemValue);
                            }}
                        >
                            <Picker.Item
                                label="-年龄排序-"
                                value="-年龄排序-"
                            />
                            <Picker.Item label="升序" value="升序" />
                            <Picker.Item label="降序" value="降序" />
                        </Picker>
                        <Picker
                            style={{ height: 50, width: 120, color: "#666" }}
                            mode="dropdown"
                            selectedValue={this.state.salarySort}
                            onValueChange={itemValue => {
                                this.salarySortChange(itemValue);
                            }}
                        >
                            <Picker.Item
                                label="-工资排序-"
                                value="-工资排序-"
                            />
                            <Picker.Item label="升序" value="升序" />
                            <Picker.Item label="降序" value="降序" />
                        </Picker>
                    </View>
                </View>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({
                            refreshing: true,
                            salarySort: "-工资排序-",
                            ageSort: "-年龄排序-"
                        });
                        this.getInitList();
                    }}
                    style={{ flex: 1, marginEnd: -10, paddingEnd: 10 }}
                    data={this.state.list}
                    keyExtractor={item => `${item.id}`}
                    ItemSeparatorComponent={() => <SeparatorLine />}
                    renderItem={({ item }) => (
                        <ListItem
                            handleDelete={this.handleDelete}
                            navigation={this.props.navigation}
                            {...item}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 10,
        flex: 1,
        flexDirection: "column"
    },
    sortBox: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#999"
    },
    ListItem: {
        width: "100%"
    },
    Label: {
        width: 80,
        justifyContent: "flex-start",
        textAlignVertical: "center",
        includeFontPadding: false
    },
    PickerBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    AddImg: {
        width: 20,
        height: 20
    },
    LabelText: {
        color: "#000"
    }
});

export default Home;
