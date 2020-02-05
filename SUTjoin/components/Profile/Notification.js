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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {
    Icon,
    Body,
    CardItem,
    Thumbnail,
    Left,
    Right,
    ListItem,
    List

} from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment'
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');
export default class ListViewExample extends Component {
    constructor(props) {
        super(props);
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
    renderListNotifications = () => {
        // console.log("status " + this.state.search);
        if (this.state.search == 1) {
            return (
                <List>
                    <FlatList
                        Vertical
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        style={[styles.shadow, { overflow: 'visible' }]}
                        data={this.state.data}
                        keyExtractor={(item, index) => `${item.id}`}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                    />
                </List>
            );
        }
        else if (this.state.search == 2) {
            return (
                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('../../asset/image/no_timeline.jpg')} style={{ width: width / 2, height: width / 2, borderRadius: width / 4 }} />
                    <Text style={{ marginTop: 10 }}>No reult</Text>

                </View>
            )
        }

    }

    renderItem = (item, index) => {
        let text = '';
        let time = '';
        let unit = '';
        let icon = '';
        let color = '';
        // console.log(item);
        if (item.status == 1) {
            text = 'join';
            icon = 'user-plus';
            color = 'green';
        } else if (item.status == 2) {
            text = 'cancel join'
            icon = 'user-times';
            color = 'red';
        } else if (item.status == 3) {
            text = 'create'
            icon = 'plus';
            color = 'green';

        }

        if (item.Difference < 60) {
            time = item.Difference;
            unit = 'minute'
        } else if (item.Difference > 60 && item.Difference < 1440) {
            time = parseInt(item.Difference / 60);
            unit = 'hour'
        } else if (item.Difference > 1440) {
            time = parseInt(item.Difference / 1440);
            unit = 'day'
        }
        let photoUser = 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
        const { navigation } = this.props;
        return (
            
            <View style={{ justifyContent: 'flex-start',backgroundColor: 'rgba(52, 52, 52, 0.2)' }}>
                
                <ListItem avatar>
                    <Left>
                        <Thumbnail small source={{ uri: photoUser }} />
                    </Left>
                    <Body>
                        <Text>{item.name} {text} {item.title}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome5 name={icon} color={color} />
                        <Text numberOfLines={1} note>
                        {" "} {time} {unit}
                        </Text>
                        </View>
                    </Body>
                    <Right>
                    <TouchableOpacity  onPress={()=>navigation.navigate('Article', { article: item.id , age_user : this.state.age_user , gender_user : this.state.gender_user })}>
                         <Icon active name="arrow-forward" />
                         </TouchableOpacity>
                    </Right>
                </ListItem>
            </View>
           
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                >
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
                            <Text style={{ fontSize: width / 20, fontWeight: 'bold', color: '#ffffff', alignSelf: 'center' }}>
                                Notifications
                            </Text>
                        </View>
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
                            {this.renderListNotifications()}
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
                user_id: user_id.split('"')[1],
            });
            console.log(this.state.qrcode)
            this.fetchData(1);
            this.getage();
            this.actionNotification();
        });

    }
    actionNotification =()=>{
        Promise.all([
            fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/ActionNotification.php', {
              method: 'post',
              headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                user_id: this.state.user_id,
                status: 1
              })
            }),
            fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/ActionNotification.php', {
              method: 'post',
              headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                user_id: this.state.user_id,
                status: 2
              })
            }),
          ])
            .then(([res1, res2]) => Promise.all([res1.text(), res2.text()]))
            .then(([data1, data2]) => console.log(data1+data2)
            
            );
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

        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetNotification.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user_id: this.state.user_id,
                page: page,
                status: 1
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
    getage = async () => {
        const response = await fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetAgeUser.php', {
          method: 'post',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            user_id: this.state.user_id
          })
        });
        const user = await response.json();
        console.log(user[0])
        this.setState({
          age_user: user[0],
          gender_user : user[1],
          loadingVisible: false
        })
        // console.log(this.state.new_img);
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
