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
    TouchableOpacity
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
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
            data: [],
            page: 1,
            dataSource: '',
            search: 0
        };

    }
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            header: (
                <LinearGradient
                    colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                    start={{ x: 0.0, y: 0.5 }}
                    end={{ x: 1.0, y: 0.5 }}
                >
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <TouchableOpacity style={styles.back, styles.row} onPress={() => navigation.goBack()}>
                            <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} style={{ marginTop: 8 }} />
                            <Text style={styles.highlight}>
                                BACK
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ backgroundColor: '#FFFFFF50', opacity: 0.5, marginTop: 10 }} >
                        <SearchBar
                            placeholder='Search'
                            onChangeText={navigation.getParam('changeText')}
                            onCancelButtonPress={navigation.getParam('cancelButton')}
                            onSearchButtonPress={navigation.getParam('searchButton')}
                            inputStyle={{ backgroundColor: 'green' }}
                        />
                    </View>
                </LinearGradient>
            ),
            headerTransparent: true,
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            changeText: this.onChangeText.bind(this),
            cancelButton: this.onCancelButtonPress.bind(this),
            searchButton: this.onSearchButtonPress.bind(this)
        });
    }

    render() {
        return (
            <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
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
    }


    onCancelButtonPress() {
        this.setState({
            dataSource: 3,
        });
    }

    onSearchButtonPress() {
        console.log(this.state.dataSource);
        this.fetchData();
        // this.setState({
        //     search: 1,
        // });
    }

    fetchData = async () => {
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
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson.length);
                if (responseJson.length > 0) {
                    this.setState({
                        search: 1,
                        data: responseJson
                    });
                } else {
                    this.setState({
                        search: 2,
                    });
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
        marginLeft:10
    },
});
