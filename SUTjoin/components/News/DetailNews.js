import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../../theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: 'transparent',
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 1.5,
    fontWeight: 'bold'
  },
  btnFooter: {
    position: 'absolute',
    left: 0,
    bottom: 10,
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.black
  },
  recommendedList: {
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
  avatar2: {
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding / 2,
  },
});

class Article extends Component {
  state = {
    join: false,
    joiner: [],
    id_user: '',
    qrcode: '',
    visibleDialog: false
  }

  scrollX = new Animated.Value(0);

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.flex, styles.row, styles.header]}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
          </TouchableOpacity>
        </View>
      ),
      headerTransparent: true,
    }
  }

  render() {
    const { navigation } = this.props;
    const article = navigation.getParam('article');
    let photoAc = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + article.url;
    // console.log(article);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
        >
          <View style={styles.flex}>
            <View style={[styles.flex]}>
              <Image
                source={{ uri: photoAc }}
                resizeMode='cover'
                style={{ width: width, height: height / 6 }}
              />
            </View>
            <View style={[styles.flex, styles.content]}>
              <View style={[styles.flex, styles.contentHeader]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.5 }}>News title</Text>
                </View>
                <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.black, fontSize: theme.sizes.font * 1.1 }}>
                    {article.news_title}
                  </Text>
                </View>
                <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
                </Text>
                <View style={{ borderBottomColor: '#ffc9de', borderBottomWidth: 3, }} />
                <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.black, fontWeight: 'bold', fontSize: theme.sizes.font * 1.5 }}>News detail</Text>
                </View>
                <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.black, fontSize: theme.sizes.font * 1.1 }}>
                    {article.news_detail}
                  </Text>
                </View>
                <Text style={{ fontSize: theme.sizes.font * 0.2, fontWeight: '500', paddingBottom: 8, }}>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default Article;