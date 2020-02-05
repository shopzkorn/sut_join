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
    ActivityIndicator,
    TextInput
} from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import QRCode from 'react-native-qrcode-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment'
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');
export default class ListViewExample extends Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.state = {
            visibleDialog: false,
            qrcode: '',
            username: '',
            user_id: '',
            id_search: '',
            trending: [],
            data: [],
            page: 1,
            dataSource: '',
            search: 0,
            visible: false,
            placeholder: '',
            horizontal: false,
            loadingVisible: false,
            loading: false,
            lastItem: true,
            isCameraVisible: false
        };

    }


    componentWillMount() {
        this.setState({
            loadingVisible: true
        })
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
    renderListActivity = () => {
        // console.log("status " + this.state.search);
        if (this.state.search == 1) {
            return (
                <View style={[styles.flex, styles.row, styles.recommended], { marginTop: 5 }}>
                    <View style={[styles.column, styles.recommendedList]}>
                        <FlatList
                            Vertical
                            pagingEnabled
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
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
                    <Image source={require('../../asset/image/no_timeline.jpg')}  style={{width : width / 2, height: width / 2 ,borderRadius: width / 4}}  />
          <Text style={{ marginTop:10 }}>No reult</Text>
        
                </View>
            )
        }

    }

    renderItem = (item, index) => {
        // console.log(item);
        let photoUser = 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
        const { navigation } = this.props;
        if (item.user_id != this.state.user_id) {
            return (
                <View style={[styles.row, { justifyContent: 'space-between',marginHorizontal:10,marginBottom:5 }]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('userProfile', { User: item.user_id })} >
                    <View style={[styles.row]}>
                        <View style={{ flex: 0 }}>
                            <Image source={{ uri: photoUser }} style={styles.avatar} />
                        </View>
                        <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                            <Text style={{ color: "#fe53bb", fontWeight: 'bold', fontSize: theme.sizes.padding * 0.4 }}>{item.name} {item.surname}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={[styles.row, { justifyContent: 'space-between' ,marginHorizontal:10,marginBottom:5}]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile', { User: item.user_id })} >
                    <View style={[styles.row]}>
                        <View style={{ flex: 0 }}>
                            <Image source={{ uri: photoUser }} style={styles.avatar} />
                        </View>
                        <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                            <Text style={{ color: "#fe53bb", fontWeight: 'bold', fontSize: theme.sizes.padding * 0.4 }}>{item.name} {item.surname}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </View>

            )
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                >
                    <View style={[{ height: 48, backgroundColor: 'rgba(255,255,255,0.5)', flexDirection: 'row', borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }]}>
                        <TextInput style={[styles.text_font, { flex: 1, paddingLeft: 18, }]}
                            placeholder="Search people"
                            placeholderTextColor="#000000"
                            underlineColorAndroid="transparent"
                            onChangeText={(keyword) => { this.setState({ dataSource: keyword }) }}
                            value={this.state.keyword}
                        />
                        <TouchableOpacity style={{ width: 50, height: 60, }} onPress={() => {
                           this.props.navigation.navigate('ScanSearchPeople')
                        }}>
                            <MaterialCommunityIcons name="qrcode" size={28} style={{ color: '#000000', marginTop: 10, }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 50, height: 60, }} onPress={() => { this.onSearchButtonPress() }}>
                            <MaterialCommunityIcons name="magnify" size={28} style={{ color: '#000000', marginTop: 10, }} />
                        </TouchableOpacity>
                        
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
                       
                        <View style={{ justifyContent: 'center' }}>
                            {this.renderListActivity()}
                        </View>
                        {this.renderFooter()}
                    </ScrollView>
                    
                </LinearGradient>
            </SafeAreaView>
        );
    }


    handleBackPress = () => {
      
            this.props.navigation.goBack(); // works best when the goBack is async
        
        return true;
    }
    componentWillUnmount() {
        this.backHandler.remove()
    }
    componentDidMount() {

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        AsyncStorage.multiGet(['user_id']).then((data) => {
            let user_id = data[0][1];
            this.setState({
                user_id:user_id.split('"')[1],
                qrcode: user_id.split('"')[1]
            });
            console.log(this.state.qrcode)
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
    fetchData = async (status) => {
        console.log('data is ' + this.state.dataSource)
        var page = 0;
        if (status == 1) {
            page = 1;
            this.setState({ page: 1 })
        }
        else {
            page = this.state.page;
        }
        console.log('fecth');
        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/SearchPeople.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                text: this.state.dataSource,
                page: page,
                status:1
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
                            loading: false,
                            horizontal: true
                        });
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
                    if (this.state.search == 1) {
                        this.setState({
                            lastItem: true,
                            loading: false
                        });
                    }
                    else {
                        this.setState({
                            search: 2,
                            loadingVisible: false,
                            lastItem: true,
                            loading: false
                        });
                    }
                }
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
        marginHorizontal: theme.sizes.margin * .3,
        // paddingVertical: theme.sizes.padding / 2,
        bottom: 10,
        // left: (width - (theme.sizes.padding * 10)) / (Platform.OS === 'ios' ? 3.2 : 3),
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
        // marginHorizontal: 8
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
        width: theme.sizes.padding * 1.5,
        height: theme.sizes.padding * 1.5,
        borderRadius: theme.sizes.padding / 2,
        marginLeft: 10,
        borderWidth: 2.5,
        borderColor: '#fff',
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
    centerEverything: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStylenoFollow: {
        paddingHorizontal: 30,
        backgroundColor: '#ffa8c0',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#ffa8c0',
    },
    buttonStyleFollow: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#fe53bb',
    },
    back: {
        width: theme.sizes.base * 3,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15
    },
});
