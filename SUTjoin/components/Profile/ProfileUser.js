import React, { Component } from "react";
import {
    View,
    Text,
    Button,
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
import * as theme from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NetworkInfo } from "react-native-network-info";
import PTRView from 'react-native-pull-to-refresh';
const { width, height } = Dimensions.get('window');

import Login from '../Profile/Login';

class Profile extends React.Component {

    state = {
        user_id: '',
        user_detail: [],
        user_name: '',
        user_surname: '',
        user_profile: '',
        myhost: [],
        refreshing: false,
        id_user: '',
        loadingVisible: true,
        followText: 'Follow',
        follow: false,
        follower: 0,
        following: 0

    }
    scrollXHost = new Animated.Value(0);
    scrollXJoin = new Animated.Value(0);

    setFollow = (data) => {
        console.log(data)
        if (data[0] > 0) {
            this.setState({
                followText: 'Followed',
                follow: true
            })
        }
        this.setState({
            following: data[1],
            follower: data[2]
        })
    }
    setHost = (data) => {
        this.setState({
            myhost: data,
        })
    }
    setProfile = (data) => {
        data.map(user =>
            this.setState({
                user_name: user.name,
                user_surname: user.surname,
                user_profile: user.profile,
            })
        )    
    }
    processFollow = () => {
        console.log('this');
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/follow.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                status: '2',
                id_user: this.state.user_id,
                follow_id: this.state.id_user,
                follow: this.state.follow
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson == 1) {
                    if (this.state.follow) {
                        this.setState({
                            follow: false,
                            follower: this.state.follower - 1
                        })
                    } else {
                        this.setState({
                            follow: true,
                            follower: this.state.follower + 1
                        })
                    }
                }
            })
    }
    fetchData = async () => {
        // console.log(this.state.myhost);
        Promise.all([
            fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyHost.php', {
                method: 'post',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_user: this.state.id_user
                })
            }),
            fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
                method: 'post',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    user_id: this.state.id_user,
                })
            }),
            fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/follow.php', {
                method: 'post',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    status: '1',
                    id_user: this.state.user_id,
                    follow_id: this.state.id_user,
                })
            })
        ])
            .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
            .then(([data1, data2, data3]) => {
                console.log(data2),
                    this.setHost(data1),
                    this.setProfile(data2),
                    this.setFollow(data3),
                    this.setState({
                        loadingVisible: false
                    })
            }
            )
    }

    renderHost = () => {
        if (!this.state.loadingVisible) {
            return (
                <View style={[styles.flex, styles.column, styles.recommended]}>
                    <View
                        style={[
                            styles.row,
                            styles.recommendedHeader
                        ]}
                    >
                        <Text style={{ fontSize: theme.sizes.font * 1.4, marginBottom: 10 }}>{this.state.user_name}'timeline</Text>
                    </View>
                    <View style={[styles.column, styles.recommendedList]}>
                        <FlatList
                            Vertical
                            pagingEnabled
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            snapToAlignment="center"
                            style={[styles.shadow, { overflow: 'visible' }]}
                            data={this.state.myhost}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={({ item, index }) => this.renderDestination(item, index)}
                        />
                    </View>
                </View>
            );
        }
    }
    refresh() {
        this.setState({ refreshing: true });
        return new Promise((resolve) => {
            this.fetchData().then(() => {
                this.setState({ refreshing: false })
            });
            setTimeout(() => { resolve() }, 2000)
        });
    }

    componentWillMount(){
        console.log("thisssss");
    }
    componentDidMount() {
        const { navigation } = this.props;
        const User = navigation.getParam('User');
        AsyncStorage.multiGet(['user_id']).then((data) => {
            let user_id = data[0][1].split('"')[1];
            this.setState((prevState, props) => ({
                id_user: User,
                user_id: user_id
            }), () => {
                console.log(this.state.id_user);
                this.fetchData()
            })
        });
    }

    renderDestination = item => {
        let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.photo;
        let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + item.profile;
        const { navigation } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
                <ImageBackground
                    style={[styles.flex, styles.destination, styles.shadow]}
                    imageStyle={{ borderRadius: theme.sizes.radius }}
                    source={{ uri: photoAc }}
                >
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <View style={{ flex: 0 }}>
                            <Image source={{ uri: photoUser }} style={styles.avatar} />
                        </View>
                        <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
                            <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.name} {item.surname}...</Text>
                            <Text style={{ color: theme.colors.white }}>
                                <MaterialCommunityIcons
                                    name="map-marker-outline"
                                    size={theme.sizes.font * 0.8}
                                    color={theme.colors.white}
                                />
                                <Text> {item.location_name}...</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end', }}>
                            <Text>
                                <MaterialCommunityIcons
                                    name="account-plus"
                                    size={theme.sizes.font * 1.5}
                                    color={theme.colors.white}
                                />
                                <Text style={styles.rating}> {item.inviter}/{item.number_people}</Text>
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
                    <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
                        {item.title}
                    </Text>
                    <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
                        <Text style={{ color: theme.colors.caption }}>
                            {item.description}...
              </Text>
                        <FontAwesome
                            name="chevron-right"
                            size={theme.sizes.font * 0.75}
                            color={theme.colors.caption}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>

                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderProfile = item => {
        const { navigation } = this.props;
        let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + this.state.user_profile;
        if (!this.state.loadingVisible) {
            return (
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)' }}>

                    <View style={styles.shadow}>
                        <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: photoUser }} style={styles.MainAvatar} />
                            <Text style={{ color: theme.colors.black, fontSize: 24, fontWeight: 'bold', marginTop: -20 }}>{this.state.user_name} {this.state.user_surname}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('FollowUser', { Status: 4,id: this.state.id_user})}>
                                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold' }}>Followings</Text>
                                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold', alignItems: 'center' }}>{this.state.following}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => navigation.navigate('FollowUser', { Status: 3,id: this.state.id_user })}>
                                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold' }}>Followers</Text>
                                <Text style={{ color: "#fe53bb", fontSize: 16, fontWeight: 'bold' }}>{this.state.follower}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                this.state.follow
                                    ? styles.buttonStyleFollow
                                    : styles.buttonStylenoFollow,
                                styles.centerEverything]}
                                activeOpacity={0.5}
                                onPress={this.processFollow.bind(this)}
                            >
                                <Text style={{
                                    color: this.state.follow
                                        ? "#fe53bb"
                                        : "#fff",
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>{this.state.followText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }

    render() {

        return (
            <LinearGradient
                colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                start={{ x: 0.0, y: 0.5 }}
                end={{ x: 1.0, y: 0.5 }}
                style={{ flex: 1 }} >
               
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
                >
                    {this.renderProfile()}
                    {this.renderHost()}
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
    row: {
        flexDirection: 'row'
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
        width: theme.sizes.padding,
        height: theme.sizes.padding,
        borderRadius: theme.sizes.padding / 2,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStylenoFollow: {
        paddingHorizontal: 30,
        backgroundColor: '#fe53bb',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#fe53bb',
    },
    buttonStyleFollow: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#fe53bb',
    },
});