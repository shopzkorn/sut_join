import React, { Component } from 'react';
import {
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
    BackHandler,
    SafeAreaView,
    AsyncStorage,
    ActivityIndicator
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
            visible: false,
            placeholder: '',
            horizontal: false,
            loadingVisible: false,
            buttonBG: [
                { button_id: '1', backgroundcolor: false, text: 'Type' },
                { button_id: '2', backgroundcolor: false, text: 'Gender' },
                { button_id: '3', backgroundcolor: false, text: 'Volunteer hour' },
                { button_id: '4', backgroundcolor: false, text: 'Age' },
                { button_id: '5', backgroundcolor: false, text: 'Date' },
                { button_id: '6', backgroundcolor: false, text: 'Number of people' },
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
                { label: 'No filter', value: 0 },
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
                { label: 'No filter', value: 0 },
                { label: 'Male', value: 1 },
                { label: 'Female', value: 2 },
                { label: 'Male & Female', value: 3 },
            ],
            radio_Volunteer: [
                { label: 'No filter', value: 0 },
                { label: '0', value: 1 },
                { label: '1-10', value: 2 },
                { label: '11-20', value: 3 },
                { label: '21-30', value: 4 },
                { label: '31-40', value: 5 },
                { label: '41-50', value: 6 },
                { label: '50+', value: 7 },
            ],
            radio_Age: [
                { label: 'No filter', value: 0 },
                { label: 'Less than 10 years old', value: 1 },
                { label: 'Less than 20 years old', value: 2 },
                { label: 'Less than 30 years old', value: 3 },
                { label: 'Less than 40 years old', value: 4 },
                { label: 'Less than 50 years old', value: 5 },
                { label: 'Less than 60 years old', value: 6 },
                { label: 'More than 60 years old', value: 7 },
            ],
            radio_Date: [
                { label: 'No filter', value: 0 },
                { label: 'Today', value: 1 },
                { label: 'This week', value: 2 },
                { label: 'This month', value: 3 },
                { label: 'This year', value: 4 },
                { label: 'Participated', value: 5 },
            ],
            radio_People: [
                { label: 'No filter', value: 0 },
                { label: '1-10', value: 1 },
                { label: '11-20', value: 2 },
                { label: '21-30', value: 3 },
                { label: '31-40', value: 4 },
                { label: '41-50', value: 5 },
                { label: '51-60', value: 6 },
                { label: '60+', value: 7 },
            ],
            valueType: 0,
            valueGender: 0,
            valueVolunteer: 0,
            valueAge: 0,
            valueDate: 0,
            valuePeople: 0,
            id_user: '',
            age_user: 0,
            gender_user: 0,
            loading: false,
            lastItem: true,
        };

    }

    FilterType = (value) => {
        console.log(value);
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (value == 0) {
            buttonBG[0].backgroundcolor = false;
        } else {
            buttonBG[0].backgroundcolor = true;
        }
        this.setState((prevState, props) => ({
            valueType: value,
            visibleType: false,
            buttonBG: buttonBG,
        }), () => {
            console.log('value is ' + this.state.valueType + ' data is ' + this.state.dataSource + ' filter is ' + this.state.loadingVisible)
            
        })

    }

    FilterGender = (value) => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (value == 0) {
            buttonBG[1].backgroundcolor = false;
        } else {
            buttonBG[1].backgroundcolor = true;
        }
        this.setState((prevState, props) => ({
            valueGender: value,
            visibleGender: false,
            buttonBG: buttonBG,
        }), () => {
            console.log('value is ' + this.state.valueGender + ' data is ' + this.state.dataSource)
            
        })
    }
    FilterVolunteer = (value) => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (value == 0) {
            buttonBG[2].backgroundcolor = false;
        } else {
            buttonBG[2].backgroundcolor = true;
        }
        this.setState((prevState, props) => ({
            valueVolunteer: value,
            visibleVolunteer: false,
            buttonBG: buttonBG,
        }), () => {
            console.log('value is ' + this.state.valueVolunteer + ' data is ' + this.state.dataSource)
            
        })
    }

    FilterAge = (value) => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (value == 0) {
            buttonBG[3].backgroundcolor = false;
        } else {
            buttonBG[3].backgroundcolor = true;
        }
        this.setState((prevState, props) => ({
            valueAge: value,
            visibleAge: false,
            buttonBG: buttonBG,
        }), () => {
            console.log('value is ' + this.state.valueAge + ' data is ' + this.state.dataSource)
            
        })
    }

    FilterDate = (value) => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (value == 0) {
            buttonBG[4].backgroundcolor = false;
        } else {
            buttonBG[4].backgroundcolor = true;
        }
        this.setState((prevState, props) => ({
            valueDate: value,
            visibleDate: false,
            buttonBG: buttonBG,
        }), () => {
            console.log('value is ' + this.state.valueDate + ' data is ' + this.state.dataSource)
            
        })
    }

    FilterPeople = (value) => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (value == 0) {
            buttonBG[5].backgroundcolor = false;
        } else {
            buttonBG[5].backgroundcolor = true;
        }
        this.setState((prevState, props) => ({
            valuePeople: value,
            visiblePeople: false,
            buttonBG: buttonBG,
        }), () => {
            console.log('value is ' + this.state.valuePeople + ' data is ' + this.state.dataSource)
            
        })
    }

    FilterTag = (text) => {
        this.setState((prevState, props) => ({
            dataSource: text
        }), () => {
            console.log('data is ' + this.state.dataSource)
            this.fetchData(1)
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
        this.setState({
            loadingVisible: true
        })


        // this.props.navigation.setParams({
        //     changeText: this.onChangeText.bind(this),
        //     cancelButton: this.onCancelButtonPress.bind(this),
        //     searchButton: this.onSearchButtonPress.bind(this)
        // });
    }

    Filter = item => {
        let buttonBG = JSON.parse(JSON.stringify(this.state.buttonBG));
        if (this.state.valueType == 0) {
            buttonBG[0].backgroundcolor = false;
        }
        if (this.state.valueGender == 0) {
            buttonBG[1].backgroundcolor = false;
        }
        if (this.state.valueVolunteer == 0) {
            buttonBG[2].backgroundcolor = false;
        }
        if (this.state.valueAge == 0) {
            buttonBG[3].backgroundcolor = false;
        }
        if (this.state.valueDate == 0) {
            buttonBG[4].backgroundcolor = false;
        }
        if (this.state.valuePeople == 0) {
            buttonBG[5].backgroundcolor = false;
        }
        if (item.button_id == 1) {
            this.setState({
                buttonBG: buttonBG,
                visibleType: true
            })
        }
        else if (item.button_id == 2) {
            this.setState({
                buttonBG: buttonBG,
                visibleGender: true
            })
        }
        else if (item.button_id == 3) {
            this.setState({
                buttonBG: buttonBG,
                visibleVolunteer: true
            })
        }
        else if (item.button_id == 4) {
            this.setState({
                buttonBG: buttonBG,
                visibleAge: true
            })
        }
        else if (item.button_id == 5) {
            this.setState({
                buttonBG: buttonBG,
                visibleDate: true
            })
        }
        else if (item.button_id == 6) {
            this.setState({
                buttonBG: buttonBG,
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
        // console.log(item);
        return (
            <View>
                <TouchableOpacity onPress={() => this.FilterTag(item.activity_tag)}>
                    <Text>{item.activity_tag}</Text>
                </TouchableOpacity>
                <View style={{ borderBottomColor: 'rgba(52, 52, 52, 0.8)', borderBottomWidth: 3, }} />
            </View>
        )

    }
    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                >

                    <View style={{ backgroundColor: '#FFFFFF50', opacity: 0.5 }} >
                        <SearchBar
                            ref="search1"
                            barStyle="black"
                            placeholder='Search by title or tag'
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
                        contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
                        onScroll={(e) => {
                            var windowHeight = Dimensions.get('window').height,
                                height = e.nativeEvent.contentSize.height,
                                offset = e.nativeEvent.contentOffset.y;
                            // console.log(windowHeight+' '+height+' '+offset)
                            if (windowHeight + offset >= height && this.state.lastItem == false) {
                                console.log('End Scroll')
                                this.setState((prevState, props) => ({
                                    page: this.state.page + 1,
                                    loading: true,
                                    lastItem: true
                                }), () => {
                                    this.fetchData(2)
                                })
                            }
                        }}>
                        {this.renderListActivity()}
                        {this.renderFooter()}
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    renderListActivity = () => {
        // console.log("status " + this.state.search);
        if (this.state.search == 1) {
            console.log("status " + this.state.data);
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

                    <Text style={{ fontSize: theme.sizes.font * 1.4 }}>No result</Text>


                </View>
            )
        }
        else if (this.state.search == 0) {
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
        // console.log(item);
        let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
        let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
        const { navigation } = this.props;
        const dates = moment(item.date_start).format('MMM, Do YYYY HH:mm');
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ArticleSearch', { article: item.id, age_user: this.state.age_user, gender_user: this.state.gender_user })}>
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
                        {item.name}  {item.surname}...
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
    handleBackPress = () => {
        if (this.state.visibleGender) {
            this.setState({
                visibleGender: false
            })
        }
        else if (this.state.visibleType) {
            this.setState({
                visibleType: false
            })
        }
        else if (this.state.visibleVolunteer) {
            this.setState({
                visibleVolunteer: false
            })
        }
        else if (this.state.visibleAge) {
            this.setState({
                visibleAge: false
            })
        }
        else if (this.state.visibleDate) {
            this.setState({
                visibleDate: false
            })
        }
        else if (this.state.visiblePeople) {
            this.setState({
                visiblePeople: false
            })
        }

        else {
            this.props.navigation.goBack(); // works best when the goBack is async
        }
        return true;
    }
    componentWillUnmount() {
        this.backHandler.remove()
    }
    componentDidMount() {

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.setState({
            dataSource: 1,
        });
        AsyncStorage.multiGet(['user_id']).then((data) => {
            let user_id = data[0][1];
            this.setState({
                id_user: user_id,
            });
            const tag = this.props.navigation.getParam('tag');
            console.log(tag)
            if (tag) {
                this.setState((prevState, props) => ({
                    dataSource: tag,
                }), () => {
                    this.fetchData(1);
                })

            } else {
                this.fetchDataTrending();
            }

            this.getage();
            console.log(this.state.id_user);
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
        this.fetchData(1);

    }
    getage = async () => {
        const response = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAgeUser.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user_id: this.state.id_user
            })
        });
        const user = await response.json();
        console.log(user)
        this.setState({
            age_user: user[0],
            gender_user: user[1]
        })
        // console.log(this.state.new_img);
    }
    fetchData = async (status) => {
        var page = 0;
        if (status == 1) {
          page = 1;
          this.setState({ page: 1 })
        }
        else {
          page = this.state.page;
        }
        console.log('fecth');
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/SearchActivity.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                text: this.state.dataSource,
                page: page,
                valueType: this.state.valueType,
                valueGender: this.state.valueGender,
                valueVolunteer: this.state.valueVolunteer,
                valueAge: this.state.valueAge,
                valueDate: this.state.valueDate,
                valuePeople: this.state.valuePeople,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson);
                if (responseJson.length > 0) {
                    this.setState({ lastItem: false })
                    if (status == 2) {
                        this.setState({ 
                          search: 1,
                          data: this.state.data.concat(responseJson), 
                          loadingVisible: false, 
                          loading: false ,
                          horizontal: true});
                      } else {
                    this.setState({
                        search: 1,
                        data: responseJson,
                        loadingVisible: false,
                        horizontal: true,
                        loading: false
                    });
                }
                } else {
                    if(this.state.search == 1){
                        this.setState({
                          lastItem: true,
                          loading: false
                        });
                      }
                      else{
                        this.setState({
                        search: 2,
                        loadingVisible: false,
                        lastItem: true,
                        loading: false
                      });}
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
            }),
            body: JSON.stringify({
                status: 1,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson.length);
                this.setState({
                    trending: responseJson,
                    loadingVisible: false
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
        // borderColor: '#ffc9de'
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
