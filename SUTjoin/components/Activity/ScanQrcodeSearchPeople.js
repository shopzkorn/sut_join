import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler,
    SafeAreaView,
    TextInput,
    Dimensions
} from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import { withNavigationFocus } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BarcodeMask from 'react-native-barcode-mask';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import * as theme from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

class ScanScreen extends Component {
    state = {
        visibleDialog: false,
        qrcode: '',
        username: '',
        user_id: '',
        id_search: '',
        username_search: '',
        subject: '',
        date: '',
        isCameraVisible: false,
        keyword: '',
        room_lat: '',
        room_lng: '',
        check: 0
    }
    onSuccessScan = (e) => {
        console.log(e.data)
        this.setState({isCameraVisible: false})
        fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/SearchPeople.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                text: e.data.split('_')[1],
                page: 1,
                status: 2,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log('res ' + responseJson);
                if (responseJson.length > 0) {
                    
                    this.props.navigation.navigate('userProfile', { User: e.data.split('_')[1] });
                }
                else{
                    alert("ไม่พบผู้ใช้")
                }
            })
    }


    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        AsyncStorage.multiGet(['user_id']).then((data) => {
            let user_id = data[0][1];
            this.setState({
                qrcode: 'userid_'+user_id.split('"')[1]
            });
        });
        // Instead of navigator.geolocation, just use Geolocation.

    }
    componentWillUnmount() {
        this.backHandler.remove()
    }
    handleBackPress = () => {
        if (this.state.visibleDialog) {
            this.setState({ visibleDialog: false })
        }
        else {
            this.props.navigation.goBack(); // works best when the goBack is async
        }
        return true;
    }

    DialogGenQrCode = (item) => {
        return (
            <View>
                <Dialog
                    visible={this.state.visibleDialog}
                    dialogStyle={{ bottom: 0 }}
                    containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
                    onTouchOutside={() => {
                        this.setState({ visibleDialog: false });
                    }}
                    width='100%'
                >
                    <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ padding: 10, borderWidth: 2, borderColor: 'black', margin: 20 }}>
                            <QRCode
                                value={this.state.qrcode}
                                size={100}
                            />
                        </View>
                        <Text>ผู้ใช้อื่นจะสามารถค้นหาคุณได้จากqrcodeนี้</Text>
                    </DialogContent>
                </Dialog>
            </View>)
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                >

                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', }}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
                            <Text style={{ fontSize: width / 20, fontWeight: 'bold', color: '#ffffff', alignSelf: 'center' }}>
                                Scan qrcode
                            </Text>
                        </View>
                    </View>
                    <Camera
                        style={styles.preview}
                        // torchMode={this.state.torchOn ? Camera.Constants.TorchMode.on : Camera.Constants.TorchMode.off}
                        onBarCodeRead={this.onSuccessScan}
                        ref={cam => this.camera = cam}
                        // aspect={Camera.Constants.Aspect.fill}
                        captureAudio={false}
                    >

                        <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={true} />

                        <TouchableOpacity style={styles.buttonStyleFollow} onPress={() => this.setState({ visibleDialog: true })}>
                            <MaterialCommunityIcons name="qrcode" size={28} style={{ color: '#fe53bb', }} />
                            <Text style={{ color: '#fe53bb', }}>My Qrcode</Text>
                        </TouchableOpacity>
                        {this.DialogGenQrCode()}
                    </Camera>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonStyleFollow: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#fe53bb',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    back: {
        width: theme.sizes.base * 3,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15
    },
});

export default withNavigationFocus(ScanScreen);