import React, { Component } from 'react';
import {
    Animated,
    Text,
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Image,
    ImageBackground,
    Dimensions,
    Platform,
    TouchableOpacity,
    CheckBox
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

export default class ListViewExample extends Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.state = {
            trending: [],
            data: [],
            page: 1,
            dataSource: '',
            search: 0,
            filter: 1,
            visible: false,
            placeholder: '',
            horizontal: false,
            loadingVisible: false,
            buttonBG: [
                { button_id: '1', backgroundcolor: true, text: 'Title' },
                { button_id: '2', backgroundcolor: false, text: 'Type' },
                { button_id: '3', backgroundcolor: false, text: 'Tag' },
                { button_id: '4', backgroundcolor: false, text: 'Gender' },
                { button_id: '5', backgroundcolor: false, text: 'Volunteer hour' },
                { button_id: '6', backgroundcolor: false, text: 'Age' },
                { button_id: '7', backgroundcolor: false, text: 'Date' },
                { button_id: '8', backgroundcolor: false, text: 'Number of people' },
            ],
            colorTitle: true,
            visibleType: false,
            visibleTag: false,
            visibleGender: false,
            visibleVolunteer: false,
            visibleAge: false,
            visibleDate: false,
            visiblePeople: false,
            radio_type: [
                { label: 'Learning', value: 1 },
                { label: 'Volunteer', value: 2 },
                { label: 'Recreation', value: 3 },
                { label: 'Hangout', value: 4 },
                { label: 'Travel', value: 5 },
                { label: 'Hobby', value: 6 },
                { label: 'Meet', value: 7 },
                { label: 'Eat & Drink', value: 8 },
            ],
            radio_Gender: [
                { label: 'Male', value: 1 },
                { label: 'Female', value: 2 },
                { label: 'Male & Female', value: 3 },
            ],
            radio_Volunteer: [
                { label: 'None', value: 1 },
                { label: '1-10', value: 2 },
                { label: '11-20', value: 3 },
                { label: '21-30', value: 4 },
                { label: '31-40', value: 5 },
                { label: '41-50', value: 6 },
                { label: '50+', value: 7 },
            ],
            radio_Age: [
                { label: 'Less than 10 years old', value: 1 },
                { label: 'Less than 20 years old', value: 2 },
                { label: 'Less than 30 years old', value: 3 },
                { label: 'Less than 40 years old', value: 4 },
                { label: 'Less than 50 years old', value: 5 },
                { label: 'Less than 60 years old', value: 6 },
                { label: 'More than 60 years old', value: 7 },
            ],
            radio_Date: [
                { label: 'Today', value: 1 },
                { label: 'This week', value: 2 },
                { label: 'This month', value: 3 },
                { label: 'This year', value: 4 },
            ],
            radio_People: [
                { label: '1-10', value: 1 },
                { label: '11-20', value: 2 },
                { label: '21-30', value: 3 },
                { label: '31-40', value: 4 },
                { label: '41-50', value: 5 },
                { label: '51-60', value: 6 },
                { label: '60+', value: 7 },
            ],
            valueType: -1,
            valueGender: -1,
            valueVolunteer: -1,
            valueAge: -1,
            valueDate: -1,
            valuePeople: -1,
        };

    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: (

                <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.goBack()}>
                        <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} style={{ marginTop: 8 }} />
                        <Text style={styles.highlight}>
                            BACK
                            </Text>
                    </TouchableOpacity>
                </View>
            ),
            headerTransparent: true,
        }
    }


    FilterType = (value) =>{
        console.log(value);
        this.setState( (prevState, props) => ({ 
            valueType: value-1,
            dataSource: value,
            visibleType: false,
            loadingVisible: true,
        }), () => {
        console.log('value is ' + this.state.valueType + ' data is ' + this.state.dataSource + ' filter is ' + this.state.loadingVisible),
        this.fetchData()
        })
        
    }

    FilterGender= (value) =>{
        this.setState( (prevState, props) => ({ 
            valueGender: value-1,
            dataSource: value,
            visibleGender: false,
            loadingVisible: true,
        }), () => {
        console.log('value is ' + this.state.valueGender + ' data is ' + this.state.dataSource + ' filter is ' + this.state.filter),
        this.fetchData()
        })
    }
     FilterVolunteer= (value) =>{
        this.setState( (prevState, props) => ({ 
            valueVolunteer: value-1,
            dataSource: value,
            visibleVolunteer: false,
            loadingVisible: true,
        }), () => {
        console.log('value is ' + this.state.valueVolunteer + ' data is ' + this.state.dataSource + ' filter is ' + this.state.filter),
        this.fetchData()
        })
    }

    FilterAge= (value) =>{
        this.setState( (prevState, props) => ({ 
            valueAge: value-1,
            dataSource: value,
            visibleAge: false,
            loadingVisible: true,
        }), () => {
        console.log('value is ' + this.state.valueAge + ' data is ' + this.state.dataSource + ' filter is ' + this.state.filter),
        this.fetchData()
        })
    }

    FilterDate= (value) =>{
        this.setState( (prevState, props) => ({  
            valueDate: value-1,
            dataSource: value,
            visibleDate: false,
            loadingVisible: true,
        }), () => {
        console.log('value is ' + this.state.valueDate + ' data is ' + this.state.dataSource + ' filter is ' + this.state.filter),
        this.fetchData()
        })
    }

    FilterPeople= (value) =>{
        this.setState( (prevState, props) => ({  
            valuePeople: value-1,
            dataSource: value,
            visiblePeople: false,
            loadingVisible: true,
        }), () => {
        console.log('value is ' + this.state.valuePeople + ' data is ' + this.state.dataSource + ' filter is ' + this.state.filter),
        this.fetchData()
        })
    }

    FilterTag= (text) =>{
        this.setState( (prevState, props) => ({
            dataSource: text
        }), () => {
        console.log('data is ' + this.state.dataSource + ' filter is ' + this.state.filter),
        this.fetchData()
        })

    }
    DialogFilter() {
        return (
            <View>

                <Dialog
                    visible={this.state.visibleType}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visibleType: false });
                    }}
                    dialogTitle={<DialogTitle title="Filter by type" />}
                    width='100%'
                >
                    <DialogContent>
                        <View>
                            <RadioForm
                                buttonColor={'#ffc9de'}
                                radio_props={this.state.radio_type}
                                initial={this.state.valueType}
                                onPress={(value) => { this.FilterType(value) }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visibleGender}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visibleGender: false });
                    }}
                    dialogTitle={<DialogTitle title="Filter by gender" />}
                    width='100%'
                >
                    <DialogContent>
                        <View>
                            <RadioForm
                                buttonColor={'#ffc9de'}
                                radio_props={this.state.radio_Gender}
                                initial={this.state.valueGender}
                                onPress={(value) => { this.FilterGender(value) }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visibleVolunteer}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visibleVolunteer: false });
                    }}
                    dialogTitle={<DialogTitle title="Filter by volunteer hour" />}
                    width='100%'
                >
                    <DialogContent>
                        <View>
                            <RadioForm
                                buttonColor={'#ffc9de'}
                                radio_props={this.state.radio_Volunteer}
                                initial={this.state.valueVolunteer}
                                onPress={(value) => { this.FilterVolunteer(value) }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visibleAge}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visibleAge: false });
                    }}
                    dialogTitle={<DialogTitle title="Filter by age" />}
                    width='100%'
                >
                    <DialogContent>
                        <View>
                            <RadioForm
                                buttonColor={'#ffc9de'}
                                radio_props={this.state.radio_Age}
                                initial={this.state.valueAge}
                                onPress={(value) => { this.FilterAge(value) }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visibleDate}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visibleDate: false });
                    }}
                    dialogTitle={<DialogTitle title="Filter by date" />}
                    width='100%'
                >
                    <DialogContent>
                        <View>
                            <RadioForm
                                buttonColor={'#ffc9de'}
                                radio_props={this.state.radio_Date}
                                initial={this.state.valueDate}
                                onPress={(value) => { this.FilterDate(value) }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visiblePeople}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visiblePeople: false });
                    }}
                    dialogTitle={<DialogTitle title="Filter by number of people" />}
                    width='100%'
                >
                    <DialogContent>
                        <View>
                            <RadioForm
                                buttonColor={'#ffc9de'}
                                radio_props={this.state.radio_People}
                                initial={this.state.valuePeople}
                                onPress={(value) => { this.FilterPeople(value) }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>
            </View>


        )
    }
    componentWillMount() {
        this.fetchDataTrending();
        // this.props.navigation.setParams({
        //     changeText: this.onChangeText.bind(this),
        //     cancelButton: this.onCancelButtonPress.bind(this),
        //     searchButton: this.onSearchButtonPress.bind(this)
        // });
    }

    Filter = item => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        this.setState({
            filter: item.button_id
        })
        for (let x = 0; x < this.state.buttonBG.length; x++) {
            if (this.state.buttonBG[x].button_id == item.button_id) {
                buttonBG[x].backgroundcolor = true;

                this.setState({
                    buttonBG: buttonBG,
                });
            } else {
                buttonBG[x].backgroundcolor = false;

                this.setState({
                    buttonBG: buttonBG,
                });
            }
        }
        if (item.button_id == 1) {
            this.setState({
                search: 0,
                visible: true
            })
        }
        if (item.button_id == 2) {
            this.setState({
                search: 0,
                visibleType: true
            })
        }
        if (item.button_id == 3) {
            this.setState({
                search: 3,
                horizontal: false
            })
        }
        if (item.button_id == 4) {
            this.setState({
                search: 0,
                visibleGender: true
            })
        }
        if (item.button_id == 5) {
            this.setState({
                search: 0,
                visibleVolunteer: true
            })
        }
        if (item.button_id == 6) {
            this.setState({
                search: 0,
                visibleAge: true
            })
        }
        if (item.button_id == 7) {
            this.setState({
                search: 0,
                visibleDate: true
            })
        }
        if (item.button_id == 8) {
            this.setState({
                search: 0,
                visiblePeople: true
            })
        }
    };

    renderFilter() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    margin: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                    backgroundColor: "#eeeeee"
                }}>Filter</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                    {this.state.buttonBG.map((item, key) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                margin: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                                backgroundColor: item.backgroundcolor
                                    ? "#cccccc"
                                    : "#eeeeee",
                            }}
                            onPress={() => this.Filter(item)}>
                            <Text >
                                {' '}
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
        )

    }

    renderTrends = (item, index) => {
        console.log(item);
        return (
            <View>
                <TouchableOpacity onPress={() => this.FilterTag(item.activity_tag)}>
                    <Text>{item.activity_tag}</Text>
                </TouchableOpacity>
                <View style={{ borderBottomColor: 'rgba(52, 52, 52, 0.8)', borderBottomWidth: 3, }} />
            </View>
        )

    }

    render() {
        return (
            <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
                <View style={{ backgroundColor: '#FFFFFF50', opacity: 0.5 }} >
                    <SearchBar
                        placeholder='Search'
                        onChangeText={this.onChangeText.bind(this)}
                        onCancelButtonPress={this.onCancelButtonPress.bind(this)}
                        onSearchButtonPress={this.onSearchButtonPress.bind(this)}
                    />
                </View>

                {this.renderFilter()}
                {this.DialogFilter()}
                <View >
                    <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: theme.sizes.padding }}>
                    {this.renderListActivity()}

                </ScrollView>
            </LinearGradient>
        );
    }

    renderListActivity = () => {
        // console.log("status " + this.state.search);
        if (this.state.search == 1) {
            return (
                <View style={[styles.flex, styles.row, styles.recommended], { marginTop: 20 }}>
                    <View
                        style={[
                            styles.row,
                            styles.recommendedHeader
                        ]}
                    >
                        <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Result</Text>
                    </View>

                    <View style={[styles.column, styles.recommendedList]}>
                        <FlatList
                            Vertical
                            pagingEnabled
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            numColumns={2}
                            key={(this.state.horizontal ? 'h' : 'v')}
                            snapToAlignment="center"
                            style={[styles.shadow, { overflow: 'visible', marginTop: 20 }]}
                            data={this.state.data}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.search == 2) {
            return (
                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <Text style={{ fontSize: theme.sizes.font * 1.4 }}>NO Result</Text>


                </View>
            )
        }
        else if (this.state.search == 3) {
            return (
                <View >
                    <View
                        style={[
                            styles.row,
                            styles.recommendedHeader
                        ]}
                    >
                        <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Trending</Text>
                    </View>
                    <View style={[styles.column, styles.recommendedList]}>
                        <FlatList
                            Vertical
                            pagingEnabled
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            numColumns={1}
                            key={(this.state.horizontal ? 'h' : 'v')}
                            snapToAlignment="center"
                            style={[styles.shadow, { overflow: 'visible', marginTop: 20 }]}
                            data={this.state.trending}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={({ item, index }) => this.renderTrends(item, index)}
                        />
                    </View>
                </View>
            )
        }
    }

    renderItem = (item, index) => {
        let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
        let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
        const { navigation } = this.props;
        const dates = moment(item.date_start).format('MMM, Do YYYY HH:mm');
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
                <ImageBackground
                    style={[styles.flex, styles.destination, styles.shadow]}
                    imageStyle={{ borderRadius: theme.sizes.radius }}
                    source={{ uri: photoAc }}
                >
                    <Image source={{ uri: photoUser }} style={styles.avatar} />

                </ImageBackground>

                <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
                    <Text style={{ fontSize: theme.sizes.font, fontWeight: '500', fontWeight: 'bold' }}>
                        HOST
                    </Text>
                    <Text style={{ fontSize: theme.sizes.font, fontWeight: '500', }}>
                        {item.name}  {item.surname.split('').slice(0, 5)}...
                    </Text>
                </View>

                <View >
                    <Text style={{
                        fontSize: theme.sizes.font * 1.1,
                        fontWeight: '500',
                        left: (width - (theme.sizes.padding * 9)) / (Platform.OS === 'ios' ? 3.2 : 3),
                        color: '#ea5e76',
                        fontWeight: 'bold'
                    }}>
                        {item.title}
                    </Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    left: (width - (theme.sizes.padding * 9)) / (Platform.OS === 'ios' ? 3.2 : 3),
                }}>
                    <Text style={{
                        fontSize: theme.sizes.font,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {dates}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    left: (width - (theme.sizes.padding * 9)) / (Platform.OS === 'ios' ? 3.2 : 3),
                }}>
                    <Text>
                        <MaterialCommunityIcons
                            name="account-plus"
                            size={theme.sizes.font}
                            color={theme.colors.white}
                        />
                        <Text style={{
                            fontSize: theme.sizes.font,
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            {item.inviter}/{item.number_people}</Text>
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: theme.sizes.font * .5, fontWeight: '500', paddingBottom: 8, }} />
                </View>
            </TouchableOpacity>

        )

    }


    componentDidMount() {
        this.setState({
            dataSource: 1,

        });
    }

    onChangeText(e) {
        this.setState({
            dataSource: e
        });
        console.log(this.state.dataSource);
    }


    onCancelButtonPress() {
        this.setState({
            dataSource: 3,
        });
    }

    onSearchButtonPress() {
        console.log(this.state.dataSource);
        this.setState({
            loadingVisible: true,
        });
        this.fetchData();

    }

    fetchData = async () => {
        console.log('fecth');
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/SearchActivity.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                status: "update",
                text: this.state.dataSource,
                page: this.state.page,
                filter: this.state.filter
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson.length);
                if (responseJson.length > 0) {
                    this.setState({
                        search: 1,
                        data: responseJson,
                        loadingVisible: false,
                        horizontal: true
                    });
                } else {
                    this.setState({
                        search: 2,
                        loadingVisible: false,
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    fetchDataTrending = async () => {
        console.log('fecth');
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Trends.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson.length);
                this.setState({
                    trending: responseJson
                });
            }).catch((error) => {
                console.error(error);
            });
    }

}

const styles = StyleSheet.create({
    flex: {
        flex: 0.5,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        backgroundColor: '#ffffff',
        paddingHorizontal: theme.sizes.padding,
        paddingTop: theme.sizes.padding * .25,
        // justifyContent: 'space-around',
        alignItems: 'center',
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    articles: {
    },
    destinations: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    destination: {
        width: width - (theme.sizes.padding * 6),
        height: width * 0.4,
        marginHorizontal: theme.sizes.margin * .3,
        paddingHorizontal: theme.sizes.padding / 2,
        paddingVertical: theme.sizes.padding * 0.66,
        borderRadius: theme.sizes.radius,
    },
    destinationInfo: {
        position: 'relative',
        borderBottomLeftRadius: theme.sizes.radius,
        borderBottomRightRadius: theme.sizes.radius,
        paddingHorizontal: theme.sizes.padding / 2,
        // paddingVertical: theme.sizes.padding / 2,
        bottom: 10,
        left: (width - (theme.sizes.padding * 10)) / (Platform.OS === 'ios' ? 3.2 : 3),
        backgroundColor: theme.colors.white,
        width: width - (theme.sizes.padding * 6),
    },
    recommended: {
    },
    recommendedHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.sizes.padding,
    },
    recommendedList: {
        justifyContent: 'space-between',
        flex: 0.5
    },
    recommendation: {
        width: (width - (theme.sizes.padding * 2)) / 4,
        marginHorizontal: 8,
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
        borderRadius: theme.sizes.radius,
        marginVertical: theme.sizes.margin * 0.5,
    },
    recommendationHeader: {
        overflow: 'hidden',
        borderTopRightRadius: theme.sizes.radius,
        borderTopLeftRadius: theme.sizes.radius,
    },
    recommendationOptions: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.sizes.padding / 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    recommendationTemp: {
        fontSize: theme.sizes.font * 1.25,
        color: theme.colors.white
    },
    recommendationImage: {
        width: (width - (theme.sizes.padding * 2)) / 2,
        height: (width - (theme.sizes.padding * 2)) / 2,
    },
    avatar: {
        width: theme.sizes.padding,
        height: theme.sizes.padding,
        borderRadius: theme.sizes.padding / 2,
        borderWidth: 2,
        borderColor: '#ffc9de'
    },
    rating: {
        fontSize: theme.sizes.font * 1.5,
        color: theme.colors.white,
        fontWeight: 'bold'
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    dots: {
        width: 10,
        height: 10,
        borderWidth: 2.5,
        borderRadius: 5,
        marginHorizontal: 6,
        backgroundColor: theme.colors.gray,
        borderColor: 'transparent',
    },
    activeDot: {
        width: 12.5,
        height: 12.5,
        borderRadius: 6.25,
        borderColor: theme.colors.active,
    },
    circleButtun: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: 50,
        marginTop: 15
    },
    marginRight: {
        marginRight: 10
    },
    highlight: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
});
