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
        user_volunteer: '',
        myhost: [],
        refreshing: false,
        id_user: '',
        loadingVisible: true

    }
    scrollXHost = new Animated.Value(0);
    scrollXJoin = new Animated.Value(0);

    GetUser() {
        console.log(this.state.id_user);
        const { navigate } = this.props.navigation;
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user_id: this.state.id_user,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // Showing response message coming from server after inserting records.
                // alert(responseJson);
                console.log(responseJson);
                responseJson.map(user =>
                    this.setState({
                        user_name: user.name,
                    })
                );
                console.log(this.state.user_name);

                responseJson.map(user =>
                    this.setState({
                        user_surname: user.surname,
                    })
                );
                console.log(this.state.user_surname);

                responseJson.map(user =>
                    this.setState({
                        user_profile: user.profile,
                    })
                );
                console.log(this.state.user_profile);

                responseJson.map(user =>
                    this.setState({
                        user_volunteer: user.volunteer,
                        loadingVisible: false
                    })
                );
                console.log(this.state.user_volunteer);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchData = async () => {
        const responseHost = await fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/GetMyHost.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_user: this.state.id_user
            })
        });
        const host = await responseHost.text();
         console.log(host);
        this.setState({ myhost: host, });
        // console.log(this.state.myhost);
    }

    renderDotsHost() {
        const { destinations } = this.props;
        const dotPosition = Animated.divide(this.scrollXHost, width);
        return (
            <View style={[
                styles.flex, styles.row,
                { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
            ]}>
                {this.state.myhost.map((item, index) => {
                    const borderWidth1 = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0, 2.5, 0],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.View
                            key={`step-${item.id}`}
                            style={[styles.dots, styles.activeDot, { borderWidth: borderWidth1 }]}
                        />
                    )
                })}
            </View>
        )
    }

    renderHost = () => {
        return (
            <View style={[styles.flex, styles.column, styles.recommended]}>
                <View
                    style={[
                        styles.row,
                        styles.recommendedHeader
                    ]}
                >
                    <Text style={{ fontSize: theme.sizes.font * 1.4 }}>HOST</Text>
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
    refresh() {
        this.setState({ refreshing: true });
        return new Promise((resolve) => {
            this.fetchData().then(() => {
                this.setState({ refreshing: false })
            });
            setTimeout(() => { resolve() }, 2000)
        });
    }
    componentWillMount() {
        const { navigation } = this.props;
        const User = navigation.getParam('User');
        this.setState((prevState, props) => ({
            id_user: User,
        }), () => {
            console.log(this.state.id_user);
            this.fetchData(),
                this.GetUser()
        })
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
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        const user_idreg = navigation.getParam('user_id');
        // this.state.user_detail.map( (user,index) =>
        let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + this.state.user_profile;
        console.log(photoUser)
        // );
        return (
            <View>
                {/* <Text style={styles.text}>PROFILE</Text> */}

                {/* <View style={{ justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: photoUser }} style={styles.avatar} />
          </View>
          <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
            <Text style={{ color: theme.colors.black, fontWeight: 'bold' }}>{this.state.user_name} {this.state.user_surname}</Text>
          </View>
        </View> */}
                <View style={styles.shadow}>
                    <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={{ uri: photoUser }} style={styles.MainAvatar} />
                    </View>
                    <View style={{ marginTop: 150, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: theme.colors.black, fontSize: 30, fontWeight: 'bold' }}>{this.state.user_name} {this.state.user_surname}</Text>
                    </View>
                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: theme.colors.black, fontSize: 20, fontWeight: 'bold' }}>Volunteer Point: {this.state.user_volunteer}</Text>
                    </View>
                </View>

                {/* <View style={{marginTop:220}}> */}
                {/* <Button
          title="Login"
          onPress={() => navigate('Login')}
        />

        <Button
          title="Register"
          onPress={() => navigate('Register')}
        /> */}

                <Button
                    title="My Interests"
                    onPress={() => navigate('MyInterest')}
                />

                <Button
                    title="Dashboard"
                    onPress={() => navigate('UserDashboard')}
                />
                {/* </View> */}

            </View>
        );
    }

    render() {

        return (
            <PTRView onRefresh={this.refresh.bind(this)} >
                <LinearGradient
                    colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                    start={{ x: 0.0, y: 0.5 }}
                    end={{ x: 1.0, y: 0.5 }}
                    style={{ flex: 1 }} >
                    <View style={{ flex: 1 }}>
                        <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
                    >
                        {this.renderProfile()}
                        {this.renderHost()}
                    </ScrollView>
                </LinearGradient>
            </PTRView>
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
        position: 'absolute',
        top: -theme.sizes.margin,
        // right: theme.sizes.margin,
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

        // borderRadius: 4,
        // borderWidth:2,
        // borderColor: '#ffc9de',
        // marginTop:5,
        // width:300,
        // height:300,
        // backgroundColor:'white',
        // alignItems: 'center'
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
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.padding,
        paddingTop: theme.sizes.padding * 1.33,
        paddingBottom: theme.sizes.padding * 0.66,
        justifyContent: 'space-between',
        alignItems: 'center',
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

});