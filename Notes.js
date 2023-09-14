// async
// import * as React from 'react'
// import { TextInput, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, AsyncStorage } from 'react-native'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import Entypo from 'react-native-vector-icons/Entypo'

// export default class NewSearch extends React.Component {
//     constructor() {
//         super()
//         this.state = {

//             search_key: '',
//             found: true,
//             modale_visable: false,
//             input_id: "",
//             input_name: "",
//             input_date: "",
//             input_phone: "",

//             input_update_id: "",
//             input_update_name: "",
//             input_update_date: "",
//             input_update_phone: "",


//             udate_index: -1,


//             add_visable: false,
//             update_visable: false,

//             modal_object: {

//             },

//             contacts: []

//         }
//     }

//     componentDidMount(){
//         this.getContacts()
//     }

//     async storeContacts(vlaue) {
//         await AsyncStorage.setItem("contacts", JSON.stringify(vlaue))
//     }

//     async getContacts(){
//         let data= await AsyncStorage.getItem("contacts")

//         if(data == null || data ==""){
//             data="[]"
//         }


//         data = JSON.parse(data)
//         this.setState({contacts: data})
//     }







//     search(contact_name) {

//         let list = this.state.contacts

//         let found = false

//         //operations
//         for (let i = 0; i < list.length; i++) {
//             //"ahmed" ==> ""
//             if (list[i].name.toLowerCase().includes(contact_name.toLowerCase())) {
//                 list[i].show = true
//                 found = true
//             } else {
//                 list[i].show = false
//             }
//         }


//         this.setState({ contacts: list, found: found })

//     }

//     add_new_contact() {
//         let list = this.state.contacts

//         let user_id = this.state.input_id.trim()
//         let user_name = this.state.input_name.trim()
//         let user_phone = this.state.input_phone.trim()
//         let user_date = this.state.input_date.trim()

//         //operations

//         let new_user = {
//             id: user_id,
//             name: user_name,
//             phone: user_phone,
//             date: user_date,
//             show: true
//         }

//         list.push(new_user)



//         this.setState({
//             contacts: list, add_visable: false, input_id: "",
//             input_name: "", input_phone: "", input_date: ""
//         })


//         this.storeContacts(list)

//     }

//     update_contact() {

//         let list = this.state.contacts
//         let index = this.state.udate_index
//         let new_id = this.state.input_update_id
//         let new_name = this.state.input_update_name
//         let new_phone = this.state.input_update_phone
//         let new_date = this.state.input_update_date


//         //operatins

//         let new_obj = {
//             id: new_id,
//             name: new_name,
//             phone: new_phone,
//             date: new_date,
//             show: true
//         }

//         list[index] = new_obj


//         // list.splice(index, 1, new_obj)

//         // list[index].id = new_id
//         // list[index].name = new_name
//         // list[index].phone = new_phone
//         // list[index].date = new_date





//         this.setState({ contacts: list, update_visable: false })

//         this.storeContacts(list)

//     }



//     render() {
//         return (
//             <View style={{ flex: 1 }}>

//                 <View style={{ width: "100%", height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f" }}>

//                     <TextInput
//                         style={{
//                             width: "95%",
//                             height: 45,
//                             backgroundColor: "#fff"
//                         }}

//                         placeholder="Enter the search key..."

//                         value={this.state.search_key}

//                         onChangeText={(value) => {

//                             this.setState({ search_key: value })

//                             this.search(value)
//                         }}
//                     />

//                 </View>

//                 {this.state.found ? (
//                     <View>
//                         {this.state.contacts.map((contact, index) => (
//                             contact.show ? (
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         this.setState({ modale_visable: true, modal_object: contact })
//                                     }}

//                                     onLongPress={() => {
//                                         this.setState({
//                                             udate_index: index,
//                                             input_update_id: contact.id + "",
//                                             input_update_name: contact.name,
//                                             input_update_phone: contact.phone,
//                                             input_update_date: contact.date,
//                                             update_visable: true
//                                         })
//                                     }}
//                                     style={{ padding: 10, borderBottomWidth: 1 }}>
//                                     <Text style={{ marginBottom: 5, fontSize: 18 }}>{contact.name}</Text>
//                                     <Text style={{ marginBottom: 5, fontSize: 16 }}>{contact.phone}</Text>
//                                 </TouchableOpacity>
//                             ) : null
//                         ))}
//                     </View>
//                 ) : (
//                     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//                         <Text>Not found</Text>
//                     </View>
//                 )
//                 }

//                 <TouchableOpacity
//                     onPress={() => {
//                         this.setState({ add_visable: true })
//                     }}
//                     style={{ width: "90%", paddingVertical: 10, alignSelf: "center", backgroundColor: "#f0f", borderRadius: 15, marginTop: 50, alignItems: "center", justifyContent: "center" }}
//                 >
//                     <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>ADD</Text>
//                 </TouchableOpacity>




//                 <Modal visible={this.state.modale_visable}
//                     onRequestClose={() => {
//                         this.setState({ modale_visable: false })
//                     }}

//                     animationType="slide"
//                 >

//                     <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>

//                         <Text>id :     {this.state.modal_object.id}</Text>
//                         <Text>name :   {this.state.modal_object.name}</Text>
//                         <Text>phone :  {this.state.modal_object.phone}</Text>
//                         <Text>date :   {this.state.modal_object.date}</Text>


//                     </View>



//                 </Modal>

//                 <Modal visible={this.state.add_visable}
//                     onRequestClose={() => {
//                         this.setState({ add_visable: false })
//                     }}>
//                     <View style={{ flex: 1, backgroundColor: "#ddd", alignItems: "center", justifyContent: 'center' }}>

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter ID...."

//                             value={this.state.input_id}

//                             onChangeText={(value) => {
//                                 this.setState({ input_id: value })
//                             }}
//                         />

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter Name...."

//                             value={this.state.input_name}

//                             onChangeText={(value) => {
//                                 this.setState({ input_name: value })
//                             }}
//                         />

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter Phone...."

//                             value={this.state.input_phone}

//                             onChangeText={(value) => {
//                                 this.setState({ input_phone: value })
//                             }}
//                         />

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter Date...."

//                             value={this.state.input_date}

//                             onChangeText={(value) => {
//                                 this.setState({ input_date: value })
//                             }}
//                         />

//                         <TouchableOpacity
//                             onPress={() => {
//                                 this.add_new_contact()
//                             }}
//                             style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: "#f0f", borderRadius: 15, marginTop: 20 }}
//                         >
//                             <Text style={{ color: "#fff" }}>Add</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Modal>


//                 <Modal visible={this.state.update_visable}
//                     onRequestClose={() => {
//                         this.setState({ update_visable: false })
//                     }}>
//                     <View style={{ flex: 1, backgroundColor: "#ddd", alignItems: "center", justifyContent: 'center' }}>

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter ID...."

//                             value={this.state.input_update_id}

//                             onChangeText={(value) => {
//                                 this.setState({ input_update_id: value })
//                             }}
//                         />

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter Name...."

//                             value={this.state.input_update_name}

//                             onChangeText={(value) => {
//                                 this.setState({ input_update_name: value })
//                             }}
//                         />

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter Phone...."

//                             value={this.state.input_update_phone}

//                             onChangeText={(value) => {
//                                 this.setState({ input_update_phone: value })
//                             }}
//                         />

//                         <TextInput
//                             style={{
//                                 width: "90%",
//                                 height: 50,
//                                 borderWidth: 1,
//                                 borderRadius: 10,
//                                 backgroundColor: "#f7f7f7",
//                                 marginBottom: 15
//                             }}

//                             placeholder="Enter Date...."

//                             value={this.state.input_update_date}

//                             onChangeText={(value) => {
//                                 this.setState({ input_update_date: value })
//                             }}
//                         />

//                         <TouchableOpacity
//                             onPress={() => {
//                                 this.update_contact()
//                             }}
//                             style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: "#f0f", borderRadius: 15, marginTop: 20 }}
//                         >
//                             <Text style={{ color: "#fff" }}>Update</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Modal>



//             </View>
//         )
//     }
// }




// import * as React from 'react';
// import {
//     View, Text, StatusBar, ImageBackground, Dimensions,
//     TextInput, Button, TouchableOpacity, ScrollView,
//     Image, StyleSheet, Modal, AsyncStorage
// } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import { Picker } from '@react-native-community/picker';
// const { width, height } = Dimensions.get('screen');
// export default class Notes extends React.Component {
//     constructor(prop) {
//         super(prop);
//         this.state = {
//             // tasks: [
//             //     {
//             //         id: 1,
//             //         task_name: "Work",
//             //         task_description: [],
//             //         selected: true,
//             //     },
//             //     {
//             //         id: 2,
//             //         task_name: "Study",
//             //         task_description: [],
//             //         selected: false,
//             //     },
//             //     {
//             //         id: 3,
//             //         task_name: "Family",
//             //         task_description: [],
//             //         selected: false,
//             //     },
//             //     {
//             //         id: 4,
//             //         task_name: "Personal",
//             //         task_description: [],
//             //         selected: false,
//             //     },
//             // ],
           
           
//             description: [ ],
//             search_key: '',
//             found: true,
//             display_visible: false,
//             display_object: {},
// //add
//             add_visible: false,
//             input_name: "",
//             input_date: "",
//             input_time: "",
//             input_day: "",
//             errorName: "",
//             errorDay: "",
//             errorTime: "",
//             errorDate: "",
//             errorAdd: '',
// //edit
//             edit_visible: false,
//             edit_name: '',
//             edit_time: '',
//             edit_day: '',
//             edit_date: '',
//             edit_index: -1,
//             errorEdit: ""
//         }
//     }

//     componentDidMount() {
//         this.getNotes()
//     }
//     async storeNotes(vlaue) {
//         await AsyncStorage.setItem("notes",
//          JSON.stringify(vlaue))
//     }
//     async getNotes() {
//         let des = await AsyncStorage.getItem("notes")
//         if (des == null || des == "") {
//             des = "[]"
//         }
//         des = JSON.parse(des) 
//         this.setState({ description: des })
//     }
//     search_item(name_task) {
//         let list = this.state.description
//         let found = false
//         for (let i = 0; i < list.length; i++) {
//             if (list[i].name.toLowerCase().includes(name_task.toLowerCase())) {
//                 list[i].show = true
//                 found = true
//             } else {
//                 list[i].show = false
//             }
//         }
//         this.setState({ description: list, found: found })
//     }

//     // selected_description_fun(desc_index) {
//     //     let list = this.state.tasks
//     //     for (let i = 0; i < list.length; i++) {
//     //         list[i].selected = false
//     //     }
//     //     list[desc_index].selected = true
//     //     this.setState({
//     //         tasks: list,
//     //         description: list[desc_index].task_description
//     //     })
//     //     this.storeNotes(list)
//     // }

   

//     delete_item(delete_index) {
//         let list = this.state.description
//         list.splice(delete_index, 1)
//         this.setState({ description: list })
//         this.storeNotes(list)
//     }

//     add_new_task() {
//         let list = this.state.description
//         let name = this.state.input_name.trim(),
//             error_name = ""
//         let date = this.state.input_date.trim(),
//             error_date = ""
//         let time = this.state.input_time.trim(),
//             error_time = ""
//         let day = this.state.input_day.trim(),
//             error_day = ""
//         let error_add = ""
//         let visible = this.state.add_visible

//         if (name == "") {
//             error_name = "Please enter your note"
//         }
//         if (date == "") {
//             error_date = "Please enter your valid date"
//         }
//         if (time == "") {
//             error_time = "Please enter valid time"
//         }
//         if (day == "") {
//             error_day = "Please enter valid day."
//         }


//         if (name == "" && date == "" && time == "" && day == "") {
//             error_add = "Please enter Valid note...",
//                 visible = true
//         } else if (name == "" || date == "" || time == "" || day == "") {
//             error_add = "Please enter the empty...",
//                 visible = true
//         } else {
//             visible = false
//             let new_task = {
//                 name: name,
//                 time: time,
//                 date: date,
//                 day: day,
//                 show: true,
//             }
//             list.push(new_task)
//         }
//         this.setState({
//             description: list,
//             input_day: "",
//             input_name: "",
//             input_time: "",
//             input_date: "",
//             errorName: error_name,
//             errorTime: error_time,
//             errorDate: error_date,
//             errorDay: error_day,
//             errorAdd: error_add,
//             add_visible: visible
//         })
//         this.storeNotes(list)
//     }

//     edit_tasks() {
//         let list = this.state.description
//         let new_name = this.state.edit_name.trim(),
//             error_name = ""
//         let new_date = this.state.edit_date.trim(),
//             error_date = ""
//         let new_time = this.state.edit_time.trim(),
//             error_time = ""
//         let new_day = this.state.edit_day.trim(),
//             error_day = ""
//         let error_edit = ""
//         let visible = this.state.edit_visible
//         let index = this.state.edit_index

//         if (new_name == "" || new_date == "" || new_day == "" || new_time == "") {
//             error_edit = "Please enter the empty..."
//             visible = true
//         } else {
//             visible = false
//             let new_task_obj = {
//                 name: new_name,
//                 time: new_time,
//                 date: new_date,
//                 day: new_day,
//                 show: true
//             }
//             list.splice(index, 1, new_task_obj)
//         }
//         // let new_task_obj = {
//         //     name: new_name,
//         //     time: new_time,
//         //     date: new_date,
//         //     day: new_day,
//         //     show: true
//         // }
//         // list.splice(index, 1, new_task_obj)
//         this.setState({
//             description: list,
//             edit_name: new_name,
//             edit_time: new_time,
//             edit_date: new_date,
//             edit_day: new_day,
//             edit_index: index,
//             edit_visible: visible,
//             errorEdit: error_edit
//         })
//         this.storeNotes(list)
//     }
//     render() {
//         return (
//             <>
//                 <View style={{ flex: 1, backgroundColor: "#ddddda", }}>
//                     <ScrollView>
//                         {/* search style:- */}
//                         <View style={{
//                             width: "100%", height: 65,
//                             alignItems: "center", justifyContent: "center",
//                             backgroundColor: "#4a707a", padding: 10,
//                         }}>
//                             <TextInput
//                                 placeholder=" Enter the search key..."
//                                 placeholderTextColor="#aaa"
//                                 style={{
//                                     width: "95%", height: 45, borderRadius: 12,
//                                     backgroundColor: "#ddddda", paddingLeft: 10,
//                                     color: "#aaa"
//                                 }}
//                                 value={this.state.search_key}
//                                 onChangeText={(value) => {
//                                     this.setState({ search_key: value }),
//                                         this.search_item(value)
//                                 }} />
//                         </View>

//                         {/* selected */}
//                         {/* <View
//                             style={{
//                                 height: 50, width: "100%", flexDirection: "row", alignSelf: "center",
//                                 borderRadius: 20, justifyContent: "space-between",
//                                 padding: 5, marginTop: 20, alignItems: "center",
//                             }}>
//                             {this.state.tasks.map((task, task_index) => (
//                                 <TouchableOpacity
//                                     onPress={() => { this.selected_description_fun(task_index) }}
//                                     style={{
//                                         height: 32, width: 80, borderRadius: 15,
//                                         backgroundColor: task.selected ? "#7697a0" : "#c2c8c5",
//                                         alignSelf: "center", justifyContent: "center",
//                                         borderBottomWidth: 0.5, alignItems: "center",
//                                         borderColor: task.selected ? "#fff" : "#000",
//                                         marginHorizontal: 6,
//                                         shadowColor: "#000",
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 6,
//                                         },
//                                         shadowOpacity: 0.37,
//                                         shadowRadius: 7.49,

//                                         elevation: 12,
//                                     }}>
//                                     <Text style={{ fontSize: 12, color: task.selected ? "#fff" : "#000" }}>{task.task_name}</Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>

//                      */}
                    
//                         {this.state.found ? (
//                             <View style={{
//                                 width: "100%", alignSelf: "center", marginTop: 30,
//                                 alignItems: "center", justifyContent: "center"
//                             }}>
//                                 {this.state.description.map((desc, desc_index) => (
//                                     desc.show ? (
//                                         < TouchableOpacity
//                                             onPress={() => { this.setState({ display_visible: true, display_object: desc }) }}
//                                             // update
//                                             onLongPress={() => {
//                                                 this.setState({
//                                                     edit_visible: true,
//                                                     edit_index: desc_index,
//                                                     edit_name: desc.name,
//                                                     edit_time: desc.time,
//                                                     edit_day: desc.day,
//                                                     edit_date: desc.date,
//                                                 })
//                                             }}
//                                             style={{
//                                                 flexDirection: "row",
//                                                 justifyContent: "space-between",
//                                                 width: "90%",
//                                                 height: 60,
//                                                 backgroundColor: "#fff",
//                                                 borderRadius: 15,
//                                                 borderWidth: 1,
//                                                 borderColor: "#aaa",
//                                                 marginTop: 10,
//                                                 alignItems: "center",
//                                                 paddingHorizontal: 15,
//                                                 paddingVertical: 15,
//                                                 shadowColor: "#bbb",
//                                                 shadowOffset: {
//                                                     width: 0,
//                                                     height: 12,
//                                                 },
//                                                 shadowOpacity: 0.58,
//                                                 shadowRadius: 16.00,

//                                                 elevation: 24,
//                                             }}>
//                                             <Text style={{
//                                                 fontSize: 15, marginLeft: 10, color: "#aaa",
//                                                 textDecorationLine: "none", fontWeight: "bold"
//                                             }}>{desc.name}</Text>
//                                             <TouchableOpacity
//                                                 onPress={() => { this.delete_item(desc_index) }} >
//                                                 <FontAwesome5 name="trash-alt" style={{ fontSize: 15, color: "#f00" }} />
//                                             </TouchableOpacity>
//                                         </TouchableOpacity>
//                                     ) : null
//                                 ))}
//                                 {/* <TouchableOpacity
//                                     onPress={() => { this.setState({ add_visible: true }) }}
//                                     style={{
//                                         width: 50, height: 50, borderRadius: 25, marginTop: 250, marginBottom: 50,
//                                         backgroundColor: "#4a707a", alignSelf: "auto",
//                                         alignItems: "center", justifyContent: "center",
//                                     }}>
//                                     <Text style={{
//                                         fontSize: 20,
//                                         fontWeight: "bold", color: "#c2c8c5", alignSelf: "center"
//                                     }}>+</Text>
//                                 </TouchableOpacity>
                         
//                           */}
//                             </View>


//                         ) : (
//                             <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 250, }}>
//                                 <Text style={{ textAlign: "center" }}>Not Found</Text>
//                             </View>
//                         )}
//                     </ScrollView>
//                     <TouchableOpacity
//                         onPress={() => { this.setState({ add_visible: true }) }}
//                         style={{
//                             width: 50, height: 50, borderRadius: 25, marginTop: 50, marginBottom: 50,
//                             backgroundColor: "#4a707a", alignSelf: "center",
//                             alignItems: "center", justifyContent: "center",
//                         }}>
//                         <Text style={{
//                             fontSize: 20,
//                             fontWeight: "bold", color: "#c2c8c5", alignSelf: "center"
//                         }}>+</Text>
//                     </TouchableOpacity>



//                     {/* display modal:- */}
//                     <Modal visible={this.state.display_visible}
//                         onRequestClose={() => {
//                             this.setState({ display_visible: false })
//                         }}
//                         animationType="slide">
//                         <View style={{
//                             backgroundColor: "#ddddda", alignItems: "center",
//                             justifyContent: "center", flex: 1
//                         }}>
//                             <Text style={{ fontSize: 24, fontWeight: "bold", color: "#4a707a" }}>{this.state.display_object.name}</Text>
//                             <Text style={{ fontSize: 20, marginTop: 15, color: "#4a707a" }}>{this.state.display_object.date}</Text>
//                             <Text style={{ fontSize: 20, marginTop: 15, color: "#4a707a" }}>{this.state.display_object.day}</Text>
//                             <Text style={{ fontSize: 20, marginTop: 15, color: "#4a707a" }}>{this.state.display_object.time}</Text>
//                         </View>
//                     </Modal>

//                     {/* Add modal:- */}
//                     <Modal visible={this.state.add_visible}
//                         onRequestClose={() => { this.setState({ add_visible: false }) }}>
//                         <View style={{
//                             flex: 1, backgroundColor: "#c2c8c5", alignItems: "center",
//                             justifyContent: 'center',
//                         }}>
//                             <ScrollView showsVerticalScrollIndicator={false}>

//                                 {/* // name input */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         marginTop: 220,
//                                         borderColor: "#aaa",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa"
//                                     }}
//                                     placeholder="Enter Name of Task...."
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.input_name}
//                                     onChangeText={(value) => {
//                                         this.setState({ input_name: value })
//                                     }}
//                                 />
//                                 <Text style={{
//                                     color: "#f00", fontSize: 10,
//                                     marginBottom: 10, paddingLeft: 15
//                                 }}>{this.state.errorName}</Text>
//                                 {/* input date */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa",
//                                         borderColor: "#aaa",
//                                     }}
//                                     placeholder="Enter date...."
//                                     placeholderTextColor="#aaa"
//                                     keyboardType="number-pad"
//                                     value={this.state.input_date}
//                                     onChangeText={(value) => {
//                                         this.setState({ input_date: value })
//                                     }}
//                                 />
//                                 <Text style={{ color: "#f00", fontSize: 10, marginBottom: 10, paddingLeft: 15 }}>{this.state.errorDate}</Text>
//                                 {/* day input */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa",
//                                         borderColor: "#aaa"
//                                     }}
//                                     placeholder="Enter Day...."
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.input_day}
//                                     onChangeText={(value) => {
//                                         this.setState({ input_day: value })
//                                     }}
//                                 />
//                                 <Text style={{ color: "#f00", fontSize: 10, marginBottom: 10, paddingLeft: 15 }}>
//                                     {this.state.errorDay}</Text>
//                                 {/* time input:- */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         borderColor: "#aaa",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa"
//                                     }}
//                                     placeholder="Enter the Time...."
//                                     keyboardType="number-pad"
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.input_time}
//                                     onChangeText={(value) => {
//                                         this.setState({ input_time: value })
//                                     }}
//                                 />
//                                 <Text style={{
//                                     color: "#f00", fontSize: 10,
//                                     marginBottom: 10, paddingLeft: 15
//                                 }}>{this.state.errorTime}</Text>
//                                 <Text style={{
//                                     color: "#f00", fontSize: 10,
//                                     marginTop: 30, textAlign: "center"
//                                 }}>{this.state.errorAdd}</Text>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         this.setState({ add_visible: true }),
//                                             this.add_new_task()
//                                     }}
//                                     style={{
//                                         width: 50, height: 50, borderRadius: 25, marginTop: 170,
//                                         backgroundColor: "#4a707a", alignSelf: "center",
//                                         alignItems: "center", justifyContent: "center",
//                                     }}>
//                                     <Text style={{
//                                         fontSize: 20,
//                                         fontWeight: "bold", color: "#c2c8c5"
//                                     }}>+</Text>
//                                 </TouchableOpacity>
//                             </ScrollView>
//                         </View>
//                     </Modal>

//                     {/* Edit modal */}
//                     <Modal visible={this.state.edit_visible}
//                         onRequestClose={() => { this.setState({ edit_visible: false }) }}>
//                         <View style={{
//                             flex: 1, backgroundColor: "#c2c8c5", alignItems: "center",
//                             justifyContent: 'center'
//                         }}>
//                             <ScrollView showsVerticalScrollIndicator={false}>

//                                 {/* // name input */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         marginTop: 220,
//                                         borderColor: "#aaa",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa"
//                                     }}
//                                     placeholder="Enter Name of Task...."
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.edit_name}
//                                     onChangeText={(value) => {
//                                         this.setState({ edit_name: value })
//                                     }}
//                                 />
//                                 <Text style={{ color: "#f00", fontSize: 12, marginBottom: 10, paddingLeft: 10 }}>{this.state.errorName}</Text>
//                                 {/* edit date */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa",
//                                         borderColor: "#aaa",
//                                     }}
//                                     placeholder="Enter date...."
//                                     keyboardType="number-pad"
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.edit_date}
//                                     onChangeText={(value) => {
//                                         this.setState({ edit_date: value })
//                                     }}
//                                 />
//                                 <Text style={{ color: "#f00", fontSize: 12, marginBottom: 10, paddingLeft: 10 }}>{this.state.errorDate}</Text>
//                                 {/* day input */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa",
//                                         borderColor: "#aaa"
//                                     }}
//                                     placeholder="Enter Day...."
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.edit_day}
//                                     onChangeText={(value) => {
//                                         this.setState({ edit_day: value })
//                                     }}
//                                 />
//                                 <Text style={{ color: "#f00", fontSize: 12, marginBottom: 10, paddingLeft: 10 }}>{this.state.errorDay}</Text>
//                                 {/* time edit:- */}
//                                 <TextInput
//                                     style={{
//                                         width: 300,
//                                         height: 50,
//                                         borderWidth: 1,
//                                         borderRadius: 10,
//                                         backgroundColor: "#f7f7f7",
//                                         borderColor: "#aaa",
//                                         paddingLeft: 15,
//                                         fontSize: 11,
//                                         color: "#aaa",
//                                     }}
//                                     placeholder="Enter the Time...."
//                                     keyboardType="number-pad"
//                                     placeholderTextColor="#aaa"
//                                     value={this.state.edit_time}
//                                     onChangeText={(value) => {
//                                         this.setState({ edit_time: value })
//                                     }}
//                                 />
//                                 <Text style={{ color: "#f00", fontSize: 12, marginBottom: 10, paddingLeft: 10 }}>{this.state.errorTime}</Text>
                               
                               
//                                 <Text style={{ color: "#f00", fontSize: 12, marginTop: 30, textAlign: "center" }}>{this.state.errorEdit}</Text>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         this.setState({ edit_visible: true }),
//                                             this.edit_tasks()
//                                     }}
//                                     style={{
//                                         width: 200, height: 50, borderRadius: 25, marginTop: 130,
//                                         backgroundColor: "#4a707a", alignSelf: "center",
//                                         alignItems: "center", justifyContent: "center",
//                                     }}>
//                                     <Text style={{
//                                         fontSize: 15,
//                                         fontWeight: "bold", color: "#c2c8c5"
//                                     }}>EDIT</Text>
//                                 </TouchableOpacity>
//                             </ScrollView>
//                         </View>
//                     </Modal>

//                 </View>
//             </>
//         )
//     }
// }

// marwa note:-....................
// import React, { Component } from 'react';
// import * as ImagePicker from 'react-native-image-picker';
// import {
//     Text, View, Modal, StatusBar, TouchableOpacity, ScrollView, TextInput, AsyncStorage,
//     ImageBackground, Image, PermissionsAndroid
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// export default class Notes extends Component {
//     constructor() {
//         super();
//         this.state = {
//             photo_uri: '',
//             search_key: '',
//             found: true,
//             modale_visable: false,
//             //add note
//             input_id: "",
//             input_name: "",
//             input_time: "",
//             input_day: "",
//             input_color: "",
//             add_visable: false,
//             modal_object: {},

//             //update note
//             update_id: "",
//             update_name: "",
//             update_time: "",
//             update_day: "",
//             update_color: "",
//             update_visable: false,
//             update_index: -1,

//             notes: [
//             ]

//         }
//     }
//     componentDidMount() {
//         this.getNotes()
//     }

//     async storeNotes(vlaue) {
//         await AsyncStorage.setItem("notes", JSON.stringify(vlaue))
//     }

//     async getNotes() {
//         let data = await AsyncStorage.getItem("notes")

//         if (data == null || data == "") {
//             data = "[]"
//         }


//         data = JSON.parse(data)
//         this.setState({ notes: data })
//     }


//     search(note_name) {
//         let list = this.state.notes
//         let found = false
//         for (let i = 0; i < list.length; i++) {
//             if (list[i].name.toLowerCase().includes(note_name.toLowerCase())) {
//                 list[i].show = true
//                 found = true
//             } else {
//                 list[i].show = false
//             }
//         }
//         this.setState({ notes: list, found: found })
//     }
//     add_new_note() {
//         let list = this.state.notes
//         let user_id = this.state.input_id.trim()
//         let user_name = this.state.input_name.trim()
//         let user_time = this.state.input_time.trim()
//         let user_day = this.state.input_day.trim()
//         let user_color = this.state.input_color.trim()
//         let image = this.state.photo_uri

//         let new_user = {
//             id: user_id,
//             name: user_name,
//             time: user_time,
//             day: user_day,
//             photo:image,
//             color: user_color,
//             show: true
//         }
//         list.push(new_user)
//         this.setState({
//             notes: list, add_visable: false, input_id: "",
//             input_name: "", input_time: "", input_day: "", input_color: "",
//             photo_uri : "",
//         })
//         this.storeNotes(list)
//     }
    

//     update_new_note() {
//         let list = this.state.notes
//         let new_id = this.state.update_id
//         let new_name = this.state.update_name
//         let new_time = this.state.update_time
//         let new_day = this.state.update_day
//         let new_color = this.state.update_color
//         let index = this.state.update_index

//         let new_obj = {
//             id: new_id,
//             name: new_name,
//             time: new_time,
//             day: new_day,
//             color: new_color,
         
//             show: true
//         }

//         list.splice(index, 1, new_obj)

//         this.setState({
//             notes: list,
//             update_id: new_id,
//             update_name: new_name,
//             update_time: new_time,
//             update_day: new_day,
//             update_color: new_color,
//             update_index: index,
//         })
//         this.storeNotes(list)
//     }

//     delete(index) {
//         let list = this.state.notes
//         list.splice(index, 1)
//         this.setState({ notes: list })
//         this.storeNotes(list)

//     }

//     requestCameraPermission = async () => {
//         try {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.CAMERA,
//                 {
//                     title: "Cool Photo App Camera Permission",
//                     message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
//                     buttonNeutral: "Ask Me Later",
//                     buttonNegative: "Cancel",
//                     buttonPositive: "OK"
//                 });
//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 console.log("You can use the camera");
//             } else {
//                 console.log("Camera permission denied");
//             }
//         } catch (err) {
//             console.warn(err);
//         }
//     };

//     selectFromGallery = () => {

//         let options = {
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
//             // console.log('Response = ', res);

//             if (res.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (res.error) {
//                 console.log('ImagePicker Error: ', res.error);
//             } else if (res.customButton) {
//                 console.log('User tapped custom button: ', res.customButton);
//                 alert(res.customButton);
//             } else {

//                 this.setState({
//                     photo_data: res.assets[0],
//                     photo_uri: res.assets[0].uri,
//                 });
//             }
//         });

//     }

//     launchCamera = () => {
//         let options = {
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.launchCamera(options, (res) => {
//             console.log('Response = ', res);

//             if (res.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (res.error) {
//                 console.log('ImagePicker Error: ', res.error);
//             } else if (res.customButton) {
//                 console.log('User tapped custom button: ', res.customButton);
//                 alert(res.customButton);
//             } else {
//                 this.setState({
//                     photo_data: res.assets[0],
//                     photo_uri: res.assets[0].uri
//                 });
//             }
//         });

//     }
//     componentDidMount() {
//         this.requestCameraPermission()
//     }


//     render() {
//         return (
//             <>
//                 <View style={{ flex: 1, backgroundColor: "#fff" }}>
//                     <ScrollView>
//                         <View style={{
//                             flexDirection: "row", alignItems: "center", justifyContent: "space-between",
//                             paddingHorizontal: 10, marginTop: 20
//                         }}>
//                             <Text style={{ fontSize: 37, fontWeight: 'bold', marginLeft: 15, color: "#FF6D00" }}>Notes</Text>
//                             <TouchableOpacity


//                                 onPress={() => {
//                                     this.setState({ add_visable: true })
//                                 }}
//                                 style={{
//                                     width: 60, height: 60, alignSelf: "center", marginRight: 12
//                                     , backgroundColor: "#FF6D00", borderRadius: 30, alignItems: "center", justifyContent: "center",
//                                     shadowColor: "#000",
//                                     shadowOffset: {
//                                         width: 0,
//                                         height: 2,
//                                     },
//                                     shadowOpacity: 0.25,
//                                     shadowRadius: 3.84,

//                                     elevation: 5,
//                                 }}
//                             >
//                                 <Icon name="plus" style={{ color: "#fff", fontSize: 20 }} />
//                             </TouchableOpacity>

//                         </View>

//                         <TextInput style={{
//                             width: '93%', backgroundColor: "#EBEEF0", paddingHorizontal: 20, alignSelf: "center"
//                             , height: 50, fontSize: 18, marginVertical: 15, borderRadius: 40,
//                         }}
//                             placeholder="Search"
//                             value={this.state.search_key}

//                             onChangeText={(value) => {

//                                 this.setState({ search_key: value })

//                                 this.search(value)
//                             }}
//                         />
//                         {this.state.found ? (

//                             <View style={{
//                                 // flexDirection: 'row', flexWrap: "wrap",
//                                 justifyContent: "space-between",
//                                 padding: 10
//                             }}>

//                                 {this.state.notes.map((note, index) => (
//                                     note.show ? (

//                                         <TouchableOpacity
//                                             // ???? ??????? 
//                                             onLongPress={() => {
//                                                 this.setState({
//                                                     update_visable: true,
//                                                     update_index: index,
//                                                     update_id: note.id + "",
//                                                     update_name: note.name,
//                                                     update_time: note.time,
//                                                     update_day: note.day,
//                                                 })
//                                             }}

//                                             style={{
//                                                 width: "95%", height: 80, borderRadius: 18, borderColor: "#FF6D00", alignSelf: "center",
//                                                 alignItems: 'center', justifyContent: "space-between", marginBottom: 15, borderWidth: 1.5
//                                                 , flexDirection: "row", paddingHorizontal: 10
//                                             }}>
//                                             <Text style={{ fontSize: 20, color: "#aaa", fontWeight: "bold" }}>{note.name}</Text>
//                                             {/* <Text style={{ fontSize: 18, color: "#FF6D00" }}>{note.time}</Text>
//                                             <Text style={{ fontSize: 18, color: "#FF6D00" }}>{note.day}</Text> */}

//                                             <TouchableOpacity

//                                                 onPress={() => {
//                                                     this.delete()
//                                                 }}
//                                                 style={{
//                                                     width: 40, height: 40, alignSelf: "center"
//                                                     , alignItems: "center", justifyContent: "center",

//                                                 }}
//                                             >
//                                                 <Icon name="times" style={{ color: "#FF6D00", fontSize: 25 }} />
//                                             </TouchableOpacity>
//                                         </TouchableOpacity>
//                                     ) : null
//                                 ))}


//                             </View>
//                         ) : (
//                             <View style={{
//                                 width: 200, height: 220, alignItems: "center", justifyContent: "center",
//                                 backgroundColor: "#fff", marginTop: 50, alignSelf: "center", borderRadius: 20,
//                                 shadowColor: "#000",
//                                 shadowOffset: {
//                                     width: 0,
//                                     height: 6,
//                                 },
//                                 shadowOpacity: 0.39,
//                                 shadowRadius: 8.30,

//                                 elevation: 13,
//                             }}>
//                                 <Text style={{ fontWeight: "bold", fontSize: 20 }}>Not found</Text>
//                             </View>

//                         )
//                         }

//                         {/* add model */}

//                         <Modal visible={this.state.add_visable}
//                             onRequestClose={() => {
//                                 this.setState({ add_visable: false })
//                             }}>
//                             <View
//                                 style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
//                             >
//                                 <View style={{
//                                     width: "100%", height: 60, backgroundColor: "#FF6D00", flexDirection: "row",

//                                     alignItems: "center", justifyContent: "space-between"
//                                 }}>
//                                     <TouchableOpacity
//                                         onPress={() => {
//                                             this.add_new_note()
//                                         }}
//                                         style={{
//                                             width: 60, height: 60,
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }} >Save</Text>
//                                     </TouchableOpacity>

//                                     <View style={{
//                                         height: 60, flexDirection: "row", alignItems: "center"
//                                         , justifyContent: "space-between", paddingHorizontal: 10, marginRight: 10
//                                     }}>
//                                         <TouchableOpacity onPress={() => {
//                                             this.launchCamera()
//                                         }}>
//                                             <Icon name="camera" style={{ fontSize: 25, color: "#fff" }} />
//                                         </TouchableOpacity>

//                                         <TouchableOpacity onPress={() => {
//                                             this.selectFromGallery()
//                                         }}>
//                                             <Icon name="images" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
//                                         </TouchableOpacity>

//                                         <TouchableOpacity>
//                                             <Icon name="microphone-alt" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>

//                                 <View style={{ width: "100%", marginBottom: 10 }}>
//                                     <ScrollView horizontal={false}>

//                                         <TextInput
//                                             style={{
//                                                 width: "100%",
//                                                 height: 60,
//                                                 backgroundColor: "#fff",
//                                                 borderBottomWidth: 1,
//                                                 borderBottomColor: "#9D9A9A",
//                                                 paddingHorizontal: 10,
//                                                 fontSize: 17
//                                             }}

//                                             placeholder="Enter title"
//                                             multiline={true}
//                                             value={this.state.input_name}

//                                             onChangeText={(value) => {
//                                                 this.setState({ input_name: value })
//                                             }}

//                                         />
//                                         <View style={{ width: "100%" }}>

//                                             <TextInput
//                                                 style={{
//                                                     width: "100%",
//                                                     backgroundColor: "#fff",
//                                                     paddingHorizontal: 10,
//                                                     fontSize: 17
//                                                 }}

//                                                 placeholder="Enter note"
//                                                 multiline={true}
//                                                 value={this.state.input_id}

//                                                 onChangeText={(value) => {
//                                                     this.setState({ input_id: value })
//                                                 }}
//                                             />

//                                             <Image
//                                                 source={{ uri: this.state.photo_uri }}
//                                                 style={{ width: "60%", height: 250, marginTop: 10, alignSelf: "center", marginBottom: 15 }}
//                                                 resizeMode="contain"
//                                             />
//                                         </View>

//                                     </ScrollView>
//                                 </View>

//                             </View>
//                             {/* </ImageBackground> */}
//                         </Modal>

//                         {/* update model */}

//                         <Modal visible={this.state.update_visable}
//                             onRequestClose={() => {
//                                 this.setState({ update_visable: false })
//                             }}>
//                             <View
//                                 style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
//                             >
//                                 <View style={{
//                                     width: "100%", height: 60, backgroundColor: "#FF6D00", flexDirection: "row",

//                                     alignItems: "center", justifyContent: "space-between"
//                                 }}>
//                                     <TouchableOpacity
//                                         onPress={() => {
//                                             this.update_new_note()
//                                             this.setState({ update_visable: false })
//                                         }}
//                                         style={{
//                                             width: 90, height: 60,
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }} >Update</Text>
//                                     </TouchableOpacity>

//                                     <View style={{
//                                         height: 60, flexDirection: "row", alignItems: "center"
//                                         , justifyContent: "space-between", paddingHorizontal: 10, marginRight: 10
//                                     }}>
//                                         <TouchableOpacity>
//                                             <Icon name="camera" style={{ fontSize: 25, color: "#fff" }} />
//                                         </TouchableOpacity>

//                                         <TouchableOpacity>
//                                             <Icon name="images" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
//                                         </TouchableOpacity>

//                                         <TouchableOpacity>
//                                             <Icon name="microphone-alt" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>

//                                 <View style={{ width: "100%", marginBottom: 10 }}>
//                                     <ScrollView horizontal={false}>

//                                         <TextInput
//                                             style={{
//                                                 width: "100%",
//                                                 height: 60,
//                                                 backgroundColor: "#fff",
//                                                 borderBottomWidth: 1,
//                                                 borderBottomColor: "#9D9A9A",
//                                                 paddingHorizontal: 10,
//                                                 fontSize: 17
//                                             }}

//                                             placeholder="Enter title"
//                                             multiline={true}

//                                             value={this.state.update_name}

//                                             onChangeText={(value) => {
//                                                 this.setState({ update_name: value })
//                                             }}
//                                         />

//                                         <View style={{ width: "100%" }}>
//                                             <TextInput
//                                                 style={{
//                                                     width: "100%",
//                                                     backgroundColor: "#fff",
//                                                     paddingHorizontal: 10,
//                                                     fontSize: 17
//                                                 }}
//                                                 multiline={true}
//                                                 placeholder="Enter note"
//                                                 value={this.state.update_id}

//                                                 onChangeText={(value) => {
//                                                     this.setState({ update_id: value })
//                                                 }}
//                                             />
//                                             <Image source={{ uri: "https://i.pinimg.com/236x/6d/45/14/6d45146fbe3a826f9c016fd3ed771d37.jpg" }}
//                                                 style={{ width: "60%", height: 250, marginTop: 10, alignSelf: "center", marginBottom: 15 }}
//                                                 resizeMode="contain"
//                                             />
//                                         </View>
//                                     </ScrollView>
//                                 </View>


//                             </View>
//                             {/* </ImageBackground> */}
//                         </Modal>
//                     </ScrollView>
//                 </View>
//             </>
//         )
//     }
// }

///.....................
import React, { Component } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
    Text, View, Modal, StatusBar, TouchableOpacity, ScrollView, TextInput, AsyncStorage,
    ImageBackground, Image, PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Notes  extends Component {
    constructor() {
        super();
        this.state = {
            photo_uri: '',
            photo_edit: '',
            search_key: '',
            found: true,
            modale_visable: false,

            //add note
            input_id: "",
            input_name: "",
            input_time: "",
            input_day: "",
            add_visable: false,
            modal_object: {},

            //update note
            update_id: "",
            update_name: "",
            update_time: "",
            update_day: "",
            update_visable: false,
            update_index: -1,

            notes: [
            ]

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
        let user_id = this.state.input_id.trim()
        let user_name = this.state.input_name.trim()
        let user_time = this.state.input_time.trim()
        let user_day = this.state.input_day.trim()
        let image = this.state.photo_uri
        let new_user = {
            id: user_id,
            name: user_name,
            time: user_time,
            day: user_day,
            photo: image,
            show: true
        }
        list.push(new_user)
        this.setState({
            notes: list, add_visable: false, input_id: "",
            input_name: "", input_time: "", input_day: "",
            photo_uri: "",
        })
        this.storeNotes(list)
    }


    update_new_note() {
        let list = this.state.notes
        let new_id = this.state.update_id
        let new_name = this.state.update_name
        let new_time = this.state.update_time
        let new_day = this.state.update_day
        let index = this.state.update_index
        let image_edit = this.state.photo_edit


        let new_obj = {
            id: new_id,
            name: new_name,
            time: new_time,
            day: new_day,
            photo_ed: image_edit,
            show: true
        }

        list.splice(index, 1, new_obj)

        this.setState({
            notes: list,
            update_id: new_id,
            update_name: new_name,
            update_time: new_time,
            update_day: new_day,
            update_index: index,
            photo_edit: ""
        })
        this.storeNotes(list)
    }

    delete(index) {
        let list = this.state.notes
        list.splice(index, 1)
        this.setState({ notes: list })
        this.storeNotes(list)

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
                    photo_edit: res.assets[0].uri,
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
                    photo_edit: res.assets[0].uri,
                });
            }
        });

    }
    componentDidMount() {
        this.requestCameraPermission()
    }


    render() {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <ScrollView>
                        <View style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                            paddingHorizontal: 10, marginTop: 20
                        }}>
                            <Text style={{ fontSize: 37, fontWeight: 'bold', marginLeft: 15, color: "#FF6D00" }}>Notes</Text>
                            <TouchableOpacity


                                onPress={() => {
                                    this.setState({ add_visable: true })
                                }}
                                style={{
                                    width: 50, height: 50, alignSelf: "center", marginRight: 12
                                    , backgroundColor: "#FF6D00", borderRadius: 25, alignItems: "center", justifyContent: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,
                                }}
                            >
                                <Icon name="pen" style={{ color: "#fff", fontSize: 20 }} />
                            </TouchableOpacity>

                        </View>

                        <TextInput style={{
                            width: '93%', backgroundColor: "#EBEEF0", paddingHorizontal: 20, alignSelf: "center"
                            , height: 50, fontSize: 18, marginVertical: 15, borderRadius: 40,
                        }}
                            placeholder="Search"
                            value={this.state.search_key}

                            onChangeText={(value) => {

                                this.setState({ search_key: value })

                                this.search(value)
                            }}
                        />
                        {this.state.found ? (

                            <View style={{
                                // flexDirection: 'row', flexWrap: "wrap",
                                justifyContent: "space-between",
                                padding: 10
                            }}>

                                {this.state.notes.map((note, index) => (
                                    note.show ? (

                                        <TouchableOpacity
                                            // ???? ??????? 
                                            onLongPress={() => {
                                                this.setState({
                                                    update_visable: true,
                                                    update_index: index,
                                                    update_id: note.id + "",
                                                    update_name: note.name,
                                                    update_time: note.time,
                                                    update_day: note.day,
                                                })
                                            }}

                                            style={{
                                                width: "95%", height: 70, borderRadius: 18, borderColor: "#FF6D00", alignSelf: "center",
                                                alignItems: 'center', justifyContent: "space-between", marginBottom: 15, borderWidth: 1.5
                                                , flexDirection: "row", paddingHorizontal: 10
                                            }}>
                                            <Text style={{ fontSize: 20, color: "#aaa", fontWeight: "bold" }}>{note.name}</Text>
                                            {/* <Text style={{ fontSize: 18, color: "#FF6D00" }}>{note.time}</Text>
                                            <Text style={{ fontSize: 18, color: "#FF6D00" }}>{note.day}</Text> */}

                                            <TouchableOpacity

                                                onPress={() => {
                                                    this.delete()
                                                }}
                                                style={{
                                                    width: 40, height: 40, alignSelf: "center"
                                                    , alignItems: "center", justifyContent: "center",

                                                }}
                                            >
                                                <Icon name="times" style={{ color: "#FF6D00", fontSize: 25 }} />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    ) : null
                                ))}


                            </View>
                        ) : (
                            <View style={{
                                width: 200, height: 220, alignItems: "center", justifyContent: "center",
                                backgroundColor: "#fff", marginTop: 50, alignSelf: "center", borderRadius: 20,
                            }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Not found</Text>
                            </View>

                        )
                        }

                        {/* add model */}

                        <Modal visible={this.state.add_visable}
                            onRequestClose={() => {
                                this.setState({ add_visable: false })
                            }}>
                            <View
                                style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
                            >
                                <View style={{
                                    width: "100%", height: 60, backgroundColor: "#FF6D00", flexDirection: "row",

                                    alignItems: "center", justifyContent: "space-between"
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.add_new_note()
                                        }}
                                        style={{
                                            width: 60, height: 60,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }} >Save</Text>
                                    </TouchableOpacity>

                                    <View style={{
                                        height: 60, flexDirection: "row", alignItems: "center"
                                        , justifyContent: "space-between", paddingHorizontal: 10, marginRight: 10
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            this.launchCamera()
                                        }}>
                                            <Icon name="camera" style={{ fontSize: 25, color: "#fff" }} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            this.selectFromGallery()
                                        }}>
                                            <Icon name="images" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
                                        </TouchableOpacity>

                                        <TouchableOpacity>
                                            <Icon name="microphone-alt" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ width: "100%", marginBottom: 10 }}>
                                    <ScrollView horizontal={false}>

                                        <TextInput
                                            style={{
                                                width: "100%",
                                                height: 60,
                                                backgroundColor: "#fff",
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#9D9A9A",
                                                paddingHorizontal: 10,
                                                fontSize: 17
                                            }}

                                            placeholder="Enter title"
                                            multiline={true}
                                            value={this.state.input_name}

                                            onChangeText={(value) => {
                                                this.setState({ input_name: value })
                                            }}

                                        />
                                        <View style={{ width: "100%" }}>

                                            <TextInput
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#fff",
                                                    paddingHorizontal: 10,
                                                    fontSize: 17
                                                }}

                                                placeholder="Enter note"
                                                multiline={true}
                                                value={this.state.input_id}

                                                onChangeText={(value) => {
                                                    this.setState({ input_id: value })
                                                }}
                                            />

                                            <Image
                                                source={{ uri: this.state.photo_uri }}
                                                style={{ width: "80%", height: 300, marginTop: 10, alignSelf: "center", marginBottom: 15 }}
                                                resizeMode="contain"
                                            />
                                        </View>

                                    </ScrollView>
                                </View>

                            </View>
                            {/* </ImageBackground> */}
                        </Modal>

                        {/* update model */}

                        <Modal visible={this.state.update_visable}
                            onRequestClose={() => {
                                this.setState({ update_visable: false })
                            }}>
                            <View
                                style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
                            >
                                <View style={{
                                    width: "100%", height: 60, backgroundColor: "#FF6D00", flexDirection: "row",

                                    alignItems: "center", justifyContent: "space-between"
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.update_new_note()
                                            this.setState({ update_visable: false })
                                        }}
                                        style={{
                                            width: 90, height: 60,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }} >Update</Text>
                                    </TouchableOpacity>

                                    <View style={{
                                        height: 60, flexDirection: "row", alignItems: "center"
                                        , justifyContent: "space-between", paddingHorizontal: 10, marginRight: 10
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            this.launchCamera()
                                        }}>
                                            <Icon name="camera" style={{ fontSize: 25, color: "#fff" }} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            this.selectFromGallery()
                                        }}>
                                            <Icon name="images" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
                                        </TouchableOpacity>

                                        <TouchableOpacity>
                                            <Icon name="microphone-alt" style={{ fontSize: 25, color: "#fff", marginLeft: 15 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ width: "100%", marginBottom: 10 }}>
                                    <ScrollView horizontal={false}>

                                        <TextInput
                                            style={{
                                                width: "100%",
                                                height: 60,
                                                backgroundColor: "#fff",
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#9D9A9A",
                                                paddingHorizontal: 10,
                                                fontSize: 17
                                            }}

                                            placeholder="Enter title"
                                            multiline={true}

                                            value={this.state.update_name}

                                            onChangeText={(value) => {
                                                this.setState({ update_name: value })
                                            }}
                                        />

                                        <View style={{ width: "100%" }}>
                                            <TextInput
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#fff",
                                                    paddingHorizontal: 10,
                                                    fontSize: 17
                                                }}
                                                multiline={true}
                                                placeholder="Enter note"
                                                value={this.state.update_id}

                                                onChangeText={(value) => {
                                                    this.setState({ update_id: value })
                                                }}
                                            />
                                            <Image source={{ uri: this.state.photo_edit  }}
                                                style={{ width: "80%", height: 300, marginTop: 10, alignSelf: "center", marginBottom: 15 }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </ScrollView>
                                </View>


                            </View>
                            {/* </ImageBackground> */}
                        </Modal>
                    </ScrollView>
                </View>
            </>
        )
    }
}