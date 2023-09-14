import React, { Component } from 'react';
// import * as React from 'react';
import {
    View, Text, StatusBar, ImageBackground, Dimensions,
    TextInput, Button, TouchableOpacity, ScrollView,
    Image, StyleSheet, Modal, AsyncStorage, PermissionsAndroid
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
import { Picker } from '@react-native-community/picker';
const { width, height } = Dimensions.get('screen');
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
export default class Note_with_time extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            notes: [],
            search_key: '',
            found: true,
            display_visible: false,
            display_object: {},
            show_time_picker: false,
            photo_uri: "",
            //add
            add_visible: false,
            input_name: "",
            input_date: "",
            input_time: "",
            input_day: "",
            input_note: "",
            input_image: "",
            errorName: "",
            errorDay: "",
            errorTime: "",
            errorDate: "",
            errorAdd: '',
            //edit
            edit_visible: false,
            edit_name: '',
            edit_time: '',
            edit_day: '',
            edit_date: '',
            edit_index: -1,
            errorEdit: "",
            edit_note: "",
            edit_photo: ""

        }
    }
    componentDidMount() {
        this.getNotes()
    }

    async storeNotes(vlaue) {
        await AsyncStorage.setItem("notes", JSON.stringify(vlaue))
    }

    async getNotes() {
        let data = await AsyncStorage.getItem("notes")

        if (data == null || data == "") {
            data = "[]"
        }


        data = JSON.parse(data)
        this.setState({ notes: data })
    }


    search(note_name) {
        let list = this.state.notes
        let found = false
        for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().includes(note_name.toLowerCase())) {
                list[i].show = true
                found = true
            } else {
                list[i].show = false
            }
        }
        this.setState({ notes: list, found: found })
    }

    add_new_note() {
        let list = this.state.notes
        let name = this.state.input_name.trim(),
            error_name = ""
        let photo = this.state.photo_uri
        let error_add = ""
        let visible = this.state.add_visible
        let note = this.state.input_note.trim()
        let time = this.state.input_time
        // if (name == "") {
        //     error_name = "Please enter your note"
        // }
        // if (date == "") {
        //     error_date = "Please enter your valid date"
        // }
        // if (time == "") {
        //     error_time = "Please enter valid time"
        // }
        // if (day == "") {
        //     error_day = "Please enter valid day."
        // }


        if (name == "" && note == "") {
            error_add = "Please enter Valid note...",
                visible = true
        } else if (name == "" || note == "") {
            error_add = "Please enter the empty...",
                visible = true
        } else {
            visible = false
            let new_task = {
                name: name,
                photo: photo,
                note: note,
                time: time,
                show: true,
            }
            list.push(new_task)
        }
        this.setState({
            notes: list,
            // input_day: "",
            input_name: "",
            input_time: "",
            // input_date: "",
            input_note: "",
            photo_uri: "",

            errorName: error_name,
            // errorTime: error_time,
            // errorDate: error_date,
            // errorDay: error_day,
            errorAdd: error_add,
            add_visible: visible
        })
        this.storeNotes(list)
    }

    edit_notes() {
        let list = this.state.notes
        let new_name = this.state.edit_name.trim(),
            error_name = ""
        // let new_date = this.state.edit_date.trim(),
        // error_date = ""
        let new_time = this.state.edit_time
        // error_time = ""
        // let new_day = this.state.edit_day.trim(),
        // error_day = ""
        let error_edit = ""
        let visible = this.state.edit_visible
        let index = this.state.edit_index
        let new_note = this.state.edit_note.trim()
        let new_photo = this.state.edit_photo

        if (new_name == "" || new_time == "" || new_note == "") {
            error_edit = "Please enter the empty..."
            visible = true
        } else {
            visible = false
            let new_task_obj = {
                name: new_name,
                time: new_time,
                // date: new_date,
                // day: new_day,
                note: new_note,
                photo: new_photo,
                show: true
            }
            list.splice(index, 1, new_task_obj)
        }
        this.setState({
            notes: list,
            edit_name: new_name,
            edit_time: new_time,
            // edit_date: new_date,
            // edit_day: new_day,
            edit_index: index,
            edit_visible: visible,
            errorEdit: error_edit,
            edit_note: new_note,
            edit_photo: new_photo
        })
        this.storeNotes(list)
    }

    delete_item(delete_index) {
        let list = this.state.notes
        list.splice(delete_index, 1)
        this.setState({ notes: list })
        this.storeNotes(list)
    }
    componentDidMount() {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    selectFromGallery = () => {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
            // console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {

                this.setState({
                    photo_data: res.assets[0],
                    photo_uri: res.assets[0].uri,
                    edit_photo: res.assets[0].uri,
                });
            }
        });

    
    }

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                this.setState({
                    photo_data: res.assets[0],
                    photo_uri: res.assets[0].uri,
                    edit_photo: res.assets[0].uri,
                });
            }
        });

       

    }



    render() {
        return (
            <>
                <ImageBackground source={{ uri: "https://i.pinimg.com/236x/2f/c2/5b/2fc25b9b0a0b12a1fe487c90125f5b62.jpg" }}
                    style={{ flex: 1 }} >
                    <ScrollView>
                        <View style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                            paddingHorizontal: 10, marginTop: 20
                        }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, color: "#7097a8" }}>My Notes</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ add_visible: true })
                                }}
                                style={{
                                    width: 50, height: 50, paddingVertical: 17, alignSelf: "center", marginRight: 12
                                    , backgroundColor: "#fff", borderRadius: 25, alignItems: "center", justifyContent: "center",
                                    shadowColor: "#fff",
                                    shadowOffset: {
                                        width: 0,
                                        height: 7,
                                    },
                                    shadowOpacity: 0.43,
                                    shadowRadius: 9.51,
                                    elevation: 22,
                                }}
                            >
                                <Icon name="plus" style={{ color: "#7097a8", fontSize: 18 }} />
                            </TouchableOpacity>

                        </View>
                        {/* search... */}
                        <TextInput style={{
                            width: '90%', backgroundColor: "#fff", padding: 10, alignSelf: "center"
                            , height: 50, fontSize: 16, marginVertical: 15, borderRadius: 15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,

                            elevation: 24,
                            paddingLeft: 20,
                        }}
                            placeholder="Search.."
                            value={this.state.search_key}

                            onChangeText={(value) => {
                                this.setState({ search_key: value })
                                this.search(value)
                            }}
                        />
                        {this.state.found ? (

                            <View style={{
                                flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between",
                                padding: 10
                            }}>

                                {this.state.notes.map((note, note_index) => (
                                    note.show ? (
                                        note.photo.length == 0 ?
                                            (
                                                <TouchableOpacity
                                                    onPress={() => { this.setState({ display_visible: true, display_object: note }) }}
                                                    // ???? ??????? 
                                                    onLongPress={() => {
                                                        this.setState({
                                                            //...........
                                                            edit_visible: true,
                                                            edit_index: note_index,
                                                            edit_name: note.name,
                                                            edit_time: note.time,
                                                            // edit_day: note.day,
                                                            // edit_date: note.date,
                                                            edit_note: note.note,
                                                            edit_photo: note.photo,
                                                        })
                                                    }}

                                                    style={{
                                                        width: 180, height: 280,
                                                        backgroundColor: "#e0e0e054",
                                                        alignItems: 'center', justifyContent: "center", marginBottom: 15
                                                        , marginLeft: 5,
                                                        // backgroundColor: "#f00",

                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 6,
                                                        },
                                                        shadowOpacity: 0.37,
                                                        shadowRadius: 7.49,

                                                        elevation: 4,



                                                    }}>
                                                    <TouchableOpacity

                                                        onPress={() => {
                                                            this.delete_item(note_index)
                                                        }}
                                                        style={{
                                                            width: 40, height: 40, alignSelf: "center", marginRight: 6, alignSelf: "flex-end", marginTop: -26
                                                            , backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
                                                            borderBottomEndRadius: 20, borderBottomStartRadius: 20,
                                                            shadowColor: "#fff",
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 7,
                                                            },
                                                            shadowOpacity: 0.43,
                                                            shadowRadius: 9.51,

                                                            elevation: 22,
                                                        }}
                                                    >
                                                        <Icon name="trash" style={{ color: "#f00", fontSize: 20 }} />
                                                    </TouchableOpacity>
                                                    <View style={{ width: 150, height: 200, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                                                        {/* <Image source={{ uri: note.photo }} style={{ width: 150, height: 170, borderRadius: 30, marginBottom: 10, marginTop: 10,alignSelf:"center" }} /> */}
                                                        <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold", textAlign: "center" }}>{note.name}</Text>
                                                        <Text style={{ fontSize: 18, color: "#000", textAlign: "center", marginTop: 10 }}>{note.time}</Text>
                                                    </View>

                                                    {/* <Text style={{ fontSize: 20, marginTop: 20, color: "#000", fontWeight: "bold", textAlign: "center" }}>{note.name}</Text> */}



                                                </TouchableOpacity>

                                            ) :
                                            (
                                                <TouchableOpacity
                                                    onPress={() => { this.setState({ display_visible: true, display_object: note }) }}
                                                    // ???? ??????? 
                                                    onLongPress={() => {
                                                        this.setState({
                                                            //...........
                                                            edit_visible: true,
                                                            edit_index: note_index,
                                                            edit_name: note.name,
                                                            edit_time: note.time,
                                                            // edit_day: note.day,
                                                            // edit_date: note.date,
                                                            edit_note: note.note,
                                                            edit_photo: note.photo,
                                                        })
                                                    }}

                                                    style={{
                                                        width: 180, height: 280,
                                                        backgroundColor: "#e0e0e054",
                                                        alignItems: 'center', justifyContent: "center", marginBottom: 15
                                                        , marginLeft: 5,
                                                        // backgroundColor: "#f00",

                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 6,
                                                        },
                                                        shadowOpacity: 0.37,
                                                        shadowRadius: 7.49,

                                                        elevation: 4,



                                                    }}>
                                                    <TouchableOpacity

                                                        onPress={() => {
                                                            this.delete_item(note_index)
                                                        }}
                                                        style={{
                                                            width: 40, height: 40, alignSelf: "center", marginRight: 6, alignSelf: "flex-end", marginTop: -22
                                                            , backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
                                                            borderBottomEndRadius: 20, borderBottomStartRadius: 20,
                                                            shadowColor: "#fff",
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 7,
                                                            },
                                                            shadowOpacity: 0.43,
                                                            shadowRadius: 9.51,

                                                            elevation: 22,
                                                        }}
                                                    >
                                                        <Icon name="trash" style={{ color: "#f00", fontSize: 20 }} />
                                                    </TouchableOpacity>
                                                    <View style={{ width: 150, height: 200, alignSelf: "center" }}>
                                                        <Image source={{ uri: note.photo }} style={{
                                                            width: 150, height: 170, borderRadius: 30,
                                                            marginBottom: 10, marginTop: 10, alignSelf: "center"
                                                        }} resizeMode="contain" />
                                                        <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold", textAlign: "center" }}>{note.name}</Text>
                                                    </View>

                                                    {/* <Text style={{ fontSize: 20, marginTop: 20, color: "#000", fontWeight: "bold", textAlign: "center" }}>{note.name}</Text> */}



                                                </TouchableOpacity>

                                            )

                                    ) : null
                                ))}


                            </View>
                        ) : (

                            // notfound:-
                            <View style={{
                                width: 200, height: 220, alignItems: "center", justifyContent: "center",
                                backgroundColor: "#fff", marginTop: 50, alignSelf: "center", borderRadius: 20,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.30,

                                elevation: 18,
                            }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Not found</Text>
                            </View>
                        )
                        }

                        {/* display modal */}
                        <Modal visible={this.state.display_visible}
                            onRequestClose={() => {
                                this.setState({ display_visible: false })
                            }}
                            animationType="slide">
                            <ImageBackground source={{ uri: "https://i.pinimg.com/236x/2f/c2/5b/2fc25b9b0a0b12a1fe487c90125f5b62.jpg" }}
                                style={{ flex: 1, alignItems: "center" }}>
                                <View style={{
                                    width: "100%", height: 100, backgroundColor: "#fff", shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30, borderBottomLeftRadius: 60, borderBottomRightRadius: 60,
                                    shadowRadius: 4.65,
                                    elevation: 15, marginBottom: 100,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        textAlign: "center", fontWeight: "bold", fontSize: 25, color: "#7097a8"
                                        ,
                                    }}>Display Note</Text>
                                </View>


                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#4a707a" }}>{this.state.display_object.name}</Text>
                                <Text style={{ fontSize: 18, marginTop: 10, color: "#4a707a", textAlign: "justify" }}>{this.state.display_object.note}</Text>
                                <Text style={{ fontSize: 18, marginTop: 10, color: "#4a707a" }}>{this.state.display_object.time}</Text>
                                <Image source={{ uri: this.state.display_object.photo }} style={{ width: 170, height: 270, borderRadius: 30, marginTop: 10 }}
                                    resizeMode="contain" />

                            </ImageBackground>
                        </Modal>

                        {/* add model */}
                        <Modal visible={this.state.add_visible}
                            onRequestClose={() => {
                                this.setState({ add_visible: false })
                            }}>
                            <ImageBackground source={{ uri: "https://i.pinimg.com/236x/2f/c2/5b/2fc25b9b0a0b12a1fe487c90125f5b62.jpg" }}
                                style={{ flex: 1, alignItems: "center" }}
                            >

                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between", width: "100%",
                                    // backgroundColor:"#f0f",
                                    alignItems: "center", justifyContent: "center", alignSelf: "center", height: 100, marginBottom: 80
                                }}>
                                    <View style={{
                                        width: "83%", height: 95, backgroundColor: "#fff", shadowColor: "#000",
                                        marginLeft: -15,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.30, borderBottomLeftRadius: 70,
                                        shadowRadius: 4.65,
                                        elevation: 15, marginBottom: 80,
                                        alignItems: "center",
                                        justifyContent: "center", alignSelf: "flex-start"
                                    }}>
                                        <Text style={{
                                            textAlign: "center", fontWeight: "bold", fontSize: 25, color: "#7097a8"
                                            , marginTop: 5
                                        }}>New Note</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: "column", marginLeft: 10,
                                        marginTop: -5, width: 50,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.37,
                                        shadowRadius: 7.49,

                                        elevation: 12,
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => { this.launchCamera() }}
                                            style={{
                                                width: 50, height: 40, borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: "#fff",
                                                alignItems: "center", justifyContent: "center",
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 6,
                                                },
                                                shadowOpacity: 0.37,
                                                shadowRadius: 7.49,

                                                elevation: 12,
                                            }}>
                                            <FontAwesome name="camera" style={{ color: "#7097a8", fontSize: 15 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { this.selectFromGallery() }}
                                            style={{
                                                width: 50, height: 40, backgroundColor: "#fff",
                                                alignItems: "center", justifyContent: "center", marginTop: 8,
                                                borderTopRightRadius: 15, borderBottomRightRadius: 15,
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 6,
                                                },
                                                shadowOpacity: 0.37,
                                                shadowRadius: 7.49,

                                                elevation: 12,
                                            }}>
                                            <FontAwesome5 name="images" style={{ color: "#7097a8", fontSize: 15 }} />
                                        </TouchableOpacity>
                                    </View>

                                </View>


                                <ScrollView showsVerticalScrollIndicator={false}>

                                    <TextInput
                                        style={{
                                            width: 360,
                                            height: 50,
                                            borderRadius: 10,
                                            backgroundColor: "#f7f7f7",
                                            marginBottom: 20,
                                            paddingHorizontal: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,

                                            elevation: 12,
                                        }}

                                        placeholder="Enter Title"

                                        value={this.state.input_name}

                                        onChangeText={(value) => {
                                            this.setState({ input_name: value })
                                        }}
                                    />

                                    {/* <TouchableOpacity onPress={() => { alert("ok") }}> */}
                                        <TextInput
                                            style={{
                                                width: 360,
                                                height: 50,
                                                borderRadius: 10,
                                                backgroundColor: "#f7f7f7",
                                                marginBottom: 20,
                                                paddingHorizontal: 10,
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 4,
                                                },
                                                shadowOpacity: 0.30,
                                                shadowRadius: 4.65,
                                                elevation: 12,
                                            }}

                                            placeholder="Enter Time"

                                            value={this.state.input_time}

                                            onChangeText={(value) => {
                                                this.setState({ input_time: value })
                                            }}
                                        />
                                    {/* </TouchableOpacity> */}
                                    <TextInput
                                        style={{
                                            width: 360,
                                            //height: 0,
                                            borderRadius: 10,
                                            backgroundColor: "#f7f7f7",
                                            marginBottom: 20,
                                            paddingHorizontal: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,
                                            elevation: 12,
                                            textAlign: "justify",
                                        }}
                                        placeholder="Enter your note"
                                        multiline={true}
                                        value={this.state.input_note}

                                        onChangeText={(value) => {
                                            this.setState({ input_note: value })
                                        }}
                                    />



                                    <Image source={{ uri: this.state.photo_uri }}
                                        style={{
                                            alignItems: "center", alignSelf: "center", marginBottom: 20, marginTop: 30,
                                            justifyContent: "center", width: 300, height: 280
                                        }}
                                        resizeMode="contain" />

                                    {/* </View> */}


                                    <Text style={{
                                        color: "#f00", fontSize: 10,
                                        marginTop: 30, textAlign: "center"
                                    }}>{this.state.errorAdd}</Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.add_new_note()
                                        }}
                                        style={{
                                            width: "40%", paddingVertical: 20, alignSelf: "center"
                                            , backgroundColor: "#7097a8", borderRadius: 10, marginTop: 10, alignItems: "center",
                                            justifyContent: "center", shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,
                                            elevation: 15,
                                        }}                                >
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Add</Text>
                                    </TouchableOpacity>



                                </ScrollView>



                            </ImageBackground>
                        </Modal>

                        {/* update model */}

                        <Modal visible={this.state.edit_visible}
                            onRequestClose={() => {
                                this.setState({ edit_visible: false })
                            }}>
                            <ImageBackground source={{ uri: "https://i.pinimg.com/236x/2f/c2/5b/2fc25b9b0a0b12a1fe487c90125f5b62.jpg" }}
                                style={{ flex: 1, alignItems: "center" }}
                            >

                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between", width: "100%",
                                    // backgroundColor:"#f0f",
                                    alignItems: "center", justifyContent: "center", alignSelf: "center", height: 100, marginBottom: 80
                                }}>
                                    <View style={{
                                        width: "83%", height: 95, backgroundColor: "#fff", shadowColor: "#000",
                                        marginLeft: -15,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.30, borderBottomLeftRadius: 70,
                                        shadowRadius: 4.65,
                                        elevation: 15, marginBottom: 80,
                                        alignItems: "center",
                                        justifyContent: "center", alignSelf: "flex-start"
                                    }}>
                                        <Text style={{
                                            textAlign: "center", fontWeight: "bold", fontSize: 25, color: "#7097a8"
                                            , marginTop: 5
                                        }}>Update Note</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: "column", marginLeft: 10,
                                        marginTop: -5, width: 50,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.37,
                                        shadowRadius: 7.49,

                                        elevation: 12,
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => { this.launchCamera() }}
                                            style={{
                                                width: 50, height: 40, borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: "#fff",
                                                alignItems: "center", justifyContent: "center",
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 6,
                                                },
                                                shadowOpacity: 0.37,
                                                shadowRadius: 7.49,

                                                elevation: 12,
                                            }}>
                                            <FontAwesome name="camera" style={{ color: "#7097a8", fontSize: 15 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { this.selectFromGallery() }}
                                            style={{
                                                width: 50, height: 40, backgroundColor: "#fff",
                                                alignItems: "center", justifyContent: "center", marginTop: 8,
                                                borderTopRightRadius: 15, borderBottomRightRadius: 15,
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 6,
                                                },
                                                shadowOpacity: 0.37,
                                                shadowRadius: 7.49,

                                                elevation: 12,
                                            }}>
                                            <FontAwesome5 name="images" style={{ color: "#7097a8", fontSize: 15 }} />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <ScrollView showsVerticalScrollIndicator={false}>

                                    <TextInput
                                        style={{
                                            width: 360,
                                            height: 50,
                                            borderRadius: 10,
                                            backgroundColor: "#f7f7f7",
                                            marginBottom: 20,
                                            paddingHorizontal: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,

                                            elevation: 8,
                                        }}

                                        placeholder="Enter Name"

                                        value={this.state.edit_name}

                                        onChangeText={(value) => {
                                            this.setState({ edit_name: value })
                                        }}
                                    />

                                    <TextInput
                                        style={{
                                            width: 360,
                                            height: 50,
                                            borderRadius: 10,
                                            backgroundColor: "#f7f7f7",
                                            marginBottom: 20,
                                            paddingHorizontal: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,

                                            elevation: 8,
                                        }}

                                        placeholder="Enter Time"

                                        value={this.state.edit_time}

                                        onChangeText={(value) => {
                                            this.setState({ edit_time: value })
                                        }}
                                    />

                                    <TextInput
                                        style={{
                                            width: 360,
                                            //height: 0,
                                            borderRadius: 10,
                                            backgroundColor: "#f7f7f7",
                                            marginBottom: 20,
                                            paddingHorizontal: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,
                                            elevation: 8,
                                            textAlign: "justify",

                                        }}
                                        placeholder="Enter your note"

                                        value={this.state.edit_note}

                                        onChangeText={(value) => {
                                            this.setState({ edit_note: value })
                                        }}
                                    />

                                    <Image source={{ uri: this.state.edit_photo }}
                                        style={{
                                            alignItems: "center", alignSelf: "center", marginBottom: 20, marginTop: 30,
                                            justifyContent: "center", width: 300, height: 280
                                        }}
                                        resizeMode="contain" />

                                    <Text style={{
                                        color: "#f00", fontSize: 12, marginTop: 30,
                                        textAlign: "center"
                                    }}>{this.state.errorEdit}</Text>


                                    <TouchableOpacity
                                        onPress={() => {
                                            this.edit_notes()
                                            this.setState({ edit_visible: false })
                                        }}
                                        style={{
                                            width: "40%", paddingVertical: 20, alignSelf: "center"
                                            , backgroundColor: "#7097a8", borderRadius: 10, marginTop: 10, alignItems: "center",
                                            justifyContent: "center", shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,

                                            elevation: 15,
                                        }}                                >
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Edit</Text>
                                    </TouchableOpacity>
                                </ScrollView>

                            </ImageBackground>
                        </Modal>

                    </ScrollView>
                </ImageBackground>
            </>
        )
    }
}