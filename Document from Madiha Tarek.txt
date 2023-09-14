import React, { Component } from 'react';
// import * as React from 'react';
import {
    View, Text, StatusBar, ImageBackground, Dimensions,
    TextInput, Button, TouchableOpacity, ScrollView,
    Image, StyleSheet, Modal, AsyncStorage
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
import { Picker } from '@react-native-community/picker';
const { width, height } = Dimensions.get('screen');
export default class Note extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            notes: [],
            search_key: '',
            found: true,
            display_visible: false,
            display_object: {},
            //add
            add_visible: false,
            input_name: "",
            input_date: "",
            input_time: "",
            input_day: "",
            input_note: "",
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
        let date = this.state.input_date.trim(),
            error_date = ""
        let time = this.state.input_time.trim(),
            error_time = ""
        let day = this.state.input_day.trim(),
            error_day = ""
        let error_add = ""
        let visible = this.state.add_visible
        let note = this.state.input_note.trim()

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


        if (name == "" && date == "" && time == "" && day == "" && note == "") {
            error_add = "Please enter Valid note...",
                visible = true
        } else if (name == "" || date == "" || time == "" || day == "" || note == "") {
            error_add = "Please enter the empty...",
                visible = true
        } else {
            visible = false
            let new_task = {
                name: name,
                time: time,
                date: date,
                day: day,
                note: note,
                show: true,
            }
            list.push(new_task)
        }
        this.setState({
            notes: list,
            input_day: "",
            input_name: "",
            input_time: "",
            input_date: "",
            input_note: "",
            errorName: error_name,
            errorTime: error_time,
            errorDate: error_date,
            errorDay: error_day,
            errorAdd: error_add,
            add_visible: visible
        })
        this.storeNotes(list)
    }

    edit_notes() {
        let list = this.state.notes
        let new_name = this.state.edit_name.trim(),
            error_name = ""
        let new_date = this.state.edit_date.trim(),
            error_date = ""
        let new_time = this.state.edit_time.trim(),
            error_time = ""
        let new_day = this.state.edit_day.trim(),
            error_day = ""
        let error_edit = ""
        let visible = this.state.edit_visible
        let index = this.state.edit_index
        let new_note = this.state.edit_note.trim()

        if (new_name == "" || new_date == "" || new_day == "" || new_time == "" || new_note == "") {
            error_edit = "Please enter the empty..."
            visible = true
        } else {
            visible = false
            let new_task_obj = {
                name: new_name,
                time: new_time,
                date: new_date,
                day: new_day,
                note: new_note,
                show: true
            }
            list.splice(index, 1, new_task_obj)
        }
        this.setState({
            notes: list,
            edit_name: new_name,
            edit_time: new_time,
            edit_date: new_date,
            edit_day: new_day,
            edit_index: index,
            edit_visible: visible,
            errorEdit: error_edit,
            edit_note: new_note
        })
        this.storeNotes(list)
    }

    delete_item(delete_index) {
        let list = this.state.notes
        list.splice(delete_index, 1)
        this.setState({ notes: list })
        this.storeNotes(list)
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
                                    this.setState({ add_visible: true})
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
                                                    edit_day: note.day,
                                                    edit_date: note.date,
                                                    edit_note:note.note
                                                })
                                            }}

                                            style={{
                                                width: 180, height: 200, borderRadius: 18, backgroundColor: "#e0e0e054",
                                                alignItems: 'center', justifyContent: "center", marginBottom: 15
                                                , shadowColor: "#000", marginLeft: 5,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 4,
                                                },
                                                shadowOpacity: 0.30,
                                                shadowRadius: 4.65,
                                                elevation: 10,
                                            }}>
                                            <TouchableOpacity

                                                onPress={() => {
                                                    this.delete_item(note_index)
                                                }}
                                                style={{
                                                    width: 40, height: 40, alignSelf: "center", marginRight: 12, alignSelf: "flex-end", marginTop: -30
                                                    , backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "center",
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
                                            <Text style={{ fontSize: 20, marginBottom: 10, color: "#000", fontWeight: "bold" }}>{note.name}</Text>
                                            <Text style={{ fontSize: 16, color: "#bbb" }}>{note.time}</Text>
                                            <Text style={{ fontSize: 16, color: "#bbb" }}>{note.day}</Text>
                                        </TouchableOpacity>
                                    ) : null
                                ))}


                            </View>
                        ) : (
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

                                elevation: 13,
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
                                <Text style={{ fontSize: 18, marginTop: 10, color: "#4a707a" }}>{this.state.display_object.date}</Text>
                                <Text style={{ fontSize: 18, marginTop: 10, color: "#4a707a" }}>{this.state.display_object.day}</Text>
                                <Text style={{ fontSize: 18, marginTop: 10, color: "#4a707a" }}>{this.state.display_object.time}</Text>
                                <Text style={{ fontSize: 18, marginTop: 10, color: "#4a707a", textAlign: "justify" }}>{this.state.display_object.note}</Text>
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
                                    }}>New Note</Text>
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

                                        value={this.state.input_name}

                                        onChangeText={(value) => {
                                            this.setState({ input_name: value })
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

                                        value={this.state.input_time}

                                        onChangeText={(value) => {
                                            this.setState({ input_time: value })
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
                                        placeholder="Enter Day"

                                        value={this.state.input_day}

                                        onChangeText={(value) => {
                                            this.setState({ input_day: value })
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
                                        placeholder="Enter Date"

                                        value={this.state.input_date}

                                        onChangeText={(value) => {
                                            this.setState({ input_date: value })
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

                                        value={this.state.input_note}

                                        onChangeText={(value) => {
                                            this.setState({ input_note: value })
                                        }}
                                    />
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
                                            , backgroundColor: "#7097a8", borderRadius: 10, marginTop: 50, alignItems: "center",
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
                                    width: "100%", height: 100, backgroundColor: "#fff", shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30, borderBottomLeftRadius: 60, borderBottomRightRadius: 60,
                                    shadowRadius: 4.65,

                                    elevation: 15, marginBottom: 100, alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{
                                        textAlign: "center", fontWeight: "bold", fontSize: 25, color: "#7097a8"
                                        ,
                                    }}>Update Note</Text>
                                </View>
                                <ScrollView>

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

                                        placeholder="Enter Day"

                                        value={this.state.edit_day}

                                        onChangeText={(value) => {
                                            this.setState({ edit_day: value })
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
                                        placeholder="Enter Date"

                                        value={this.state.edit_date}

                                        onChangeText={(value) => {
                                            this.setState({ edit_date: value })
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
                                            , backgroundColor: "#7097a8", borderRadius: 10, marginTop: 50, alignItems: "center",
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