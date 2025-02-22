import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    Animated,
    StyleSheet,
    ScrollView,
    FlatList,
    ImageBackground,
    Dimensions,
    Platform,
    TouchableOpacity,
    AsyncStorage

} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

class Profile extends React.Component {

    state = {
        status: '',
        user_detail: [],
        refreshing: false,
        id_user: '',
        loadingVisible: true,
        followText: 'Follow',
        follow: false,
        user_id: '',
        buttonBG: [],
        page: 1,
        loading: false,
        lastItem: true,
        datalen:0
    }

    processFollow = (item) => {
        console.log('this');
        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/follow.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                status: '2',
                id_user: this.state.user_id,
                follow_id: item.user_id,
                follow: item.backgroundColor
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

            })
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
        // console.log(this.state.myhost);
        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/follow.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                status: this.state.status,
                id_user: this.state.id_user,
                user_id: this.state.user_id,
                page: page
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.length > 0) {
                    if (status == 2) {
                        this.setState({
                            user_detail: this.state.user_detail.concat(responseJson),
                            loadingVisible: false,
                            lastItem: false,
                            loading: false,
                            datalen:responseJson.length
                        })
                    }
                    else {
                        this.setState({
                            user_detail: responseJson,
                            loadingVisible: false,
                            lastItem: false,
                            loading: false,
                            datalen:responseJson.length
                        })
                    }
                } else {
                    this.setState({
                        lastItem: true,
                        loading: false,
                        loadingVisible: false,
                        datalen:0
                      });
                }
            })
    }

    renderFollow = () => {
        if (!this.state.loadingVisible) {
            if(this.state.datalen != 0){
            return (
                <FlatList
                    Vertical
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={[styles.shadow, { overflow: 'visible' }]}
                    data={this.state.user_detail}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({ item, index }) => this.renderDestination(item, index)}
                />
            );
        }
        else{
            return (
                <View style={{ marginTop:10, justifyContent: 'center',alignItems:'center' }}>
                   <Image source={require('../../asset/image/no_timeline.jpg')} style={{ width: width / 2, height: width / 2, borderRadius: width / 4 }} />
                   <Text style={{marginTop:10}}>Empty list</Text>
                </View>
            )  
        }
        }
    }

    refresh() {
        this.setState({ refreshing: true });
        return new Promise((resolve) => {
            this.fetchData(1).then(() => {
                this.setState({ refreshing: false })
            });
            setTimeout(() => { resolve() }, 2000)
        });
    }
    componentWillMount() {

    }
    componentDidMount() {
        const { navigation } = this.props;
        const Status = navigation.getParam('Status');
        const id = navigation.getParam('id');
        AsyncStorage.multiGet(['user_id']).then((data) => {
            let user_id = data[0][1].split('"')[1];
            this.setState((prevState, props) => ({
                id_user: id,
                status: Status,
                user_id: user_id
            }), () => {
                console.log(this.state.id_user);
                this.fetchData(1)
            })
        });
    }
    changBG = item => {

        let buttonBG = JSON.parse(JSON.stringify(this.state.user_detail));

        for (let x = 0; x < this.state.user_detail.length; x++) {
            if (this.state.user_detail[x].button_id == item.button_id) {
                if (!buttonBG[x].backgroundColor) {
                    buttonBG[x].backgroundColor = true;
                    buttonBG[x].text = 'Followed';
                } else {
                    buttonBG[x].backgroundColor = false;
                    buttonBG[x].text = 'Follow';
                }
                this.setState({
                    user_detail: buttonBG,
                });
            }
        }
        this.processFollow(item);

    }
    renderList = (item) => {
        let photoUser = 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
        const { navigation } = this.props;
        if (item.user_id != this.state.user_id) {
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.props.navigation.state.params.onNavigateBack(item.user_id);
                    navigation.navigate('userProfile', { User: item.user_id })
                }} >
                    <View style={[styles.row]}>
                        <View style={{ flex: 0 }}>
                            <Image source={{ uri: photoUser }} style={styles.avatar} />
                        </View>
                        <View style={{ marginHorizontal: 10, justifyContent: 'center', }}>
                            <Text style={{ color: "#fe53bb", fontWeight: 'bold', fontSize: theme.sizes.padding * 0.4 }}>{item.name} {item.surname}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
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
            )
        }
    }
    renderButton = (item) => {
        if (item.user_id != this.state.user_id) {
            return (
                <TouchableOpacity style={[
                    item.backgroundColor
                        ? styles.buttonStyleFollow
                        : styles.buttonStylenoFollow,
                ]}
                    activeOpacity={0.5}
                    onPress={() => this.changBG(item)}
                >
                    <Text style={{
                        color: item.backgroundColor
                            ? "#fe53bb"
                            : "#fff",
                        fontSize: 16,
                        paddingVertical: 2,
                        fontWeight: 'bold'
                    }}>{item.text}</Text>
                </TouchableOpacity>
            )
        }
    }
    renderDestination = item => {
        
        return (
            <View style={[styles.row, { marginTop: 10, justifyContent: 'space-between' }]}>
                {this.renderList(item)}
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginRight: 10 }}>
                    {this.renderButton(item)}
                </View>

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
    renderHeader = () => {
        if (this.state.status == '3') {
            return (
                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
          <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
        </TouchableOpacity>
        <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
            <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                Followers
            </Text>
        </View>
      </View>
            )
        }
        else {
            return (
                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
          <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
        </TouchableOpacity>
        <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
            <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                Followings
            </Text>
        </View>
      </View>
            )
        }
    }
    render() {

        return (
            <LinearGradient
                colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                start={{ x: 0.0, y: 0.5 }}
                end={{ x: 1.0, y: 0.5 }}
                style={{ flex: 1 }} >
                {this.renderHeader()}
                <ScrollView
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
                    {this.renderFollow()}
                    {this.renderFooter()}
                </ScrollView>
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
                </View>
            </LinearGradient>
        )


    }
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    MainAvatar: {
        top: -theme.sizes.margin,
        borderWidth: 2.5,
        borderColor: '#fff',
        width: theme.sizes.padding * 4,
        height: theme.sizes.padding * 4,
        borderRadius: theme.sizes.padding,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    flex: {
        flex: 0,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        paddingHorizontal: theme.sizes.padding,
        paddingTop: theme.sizes.padding,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    destinations: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    destination: {
        width: width - (theme.sizes.padding * 2),
        height: width * 0.6,
        marginHorizontal: theme.sizes.margin,
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding * 0.66,
        borderRadius: theme.sizes.radius,
    },
    destinationInfo: {
        position: 'absolute',
        borderRadius: theme.sizes.radius,
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding / 2,
        bottom: 20,
        left: (width - (theme.sizes.padding * 4)) / (Platform.OS === 'ios' ? 3.2 : 3),
        backgroundColor: theme.colors.white,
        width: width - (theme.sizes.padding * 4),
    },
    recommended: {
    },
    recommendedHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.sizes.padding,
    },
    recommendedList: {
    },
    recommendation: {
        width: (width - (theme.sizes.padding * 2)) / 2,
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
    centerEverything: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    buttonStylenoFollow: {
        paddingHorizontal: 30,
        backgroundColor: '#fe53bb',
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#fe53bb',
    },
    buttonStyleFollow: {
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
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