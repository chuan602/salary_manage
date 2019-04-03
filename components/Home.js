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
            list: []
        };
        this.getInitList = this.getInitList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.props.navigation.addListener("willFocus", () => {
            if (this.props.navigation.getParam("update")) {
                this.getInitList();
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
                    navigation.navigate("AddItem");
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
                    list: res.data
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
    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.sortBox}>
                    <View style={styles.Label}>
                        <Text>分类查询：</Text>
                    </View>
                    <View style={styles.PickerBox}>
                        <Picker style={{ height: 50, width: 100 }}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                        <Picker style={{ height: 50, width: 100 }}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                        <Picker style={{ height: 50, width: 100 }}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.sortBox}>
                    <View style={styles.Label}>
                        <Text>排序方式：</Text>
                    </View>
                    <View style={styles.PickerBox}>
                        <Picker style={{ height: 50, width: 100 }}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                        <Picker style={{ height: 50, width: 100 }}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
                <FlatList
                    style={{ flex: 1 , marginEnd: -10, paddingEnd: 10}}
                    data={this.state.list}
                    keyExtractor={item => `${item.id}`}
                    ItemSeparatorComponent={() => <SeparatorLine />}
                    renderItem={({ item }) => (
                        <ListItem handleDelete={this.handleDelete} navigation={this.props.navigation} {...item} />
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
        flexDirection: "row",
        justifyContent: "space-between"
    },
    AddImg: {
        width: 20,
        height: 20
    }
});

export default Home;
