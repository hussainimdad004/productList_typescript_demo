import * as React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import { SECONDARY_DISABLE_GRAY, MAIN_RED, MAIN_WHITE, GRAY_OTHER, SECONDARY_BLACK, SECONDARY_COOL_GRAY_2, SECONDARY_COOL_GRAY, MAIN_GRAY } from '../../../constants/colors';
import WebApi from '../../../config/index'
import { scale, verticalScale } from '../../../common/scalling';
import { formatCurrency } from '../../../common/formatNumber';
import AutoHeightImage from 'react-native-auto-height-image';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';


export interface Product {
  name: string;
  colour: string,
  price: number,
  img: string,
  qty: number,
  id: number,
  index: number
}

interface State {
  name: string;
  _data: Array<Product>;
  local_data: Array<Product>;
  quantity: number;
  total_cart_amount: number;
  filterModal: boolean;
  filtersArray: Array<string>;
  filter_value: string;
}

class Home extends React.PureComponent<Product, State> {
  constructor(props: Product) {
    super(props);
    this.state = {
      name: props.name || 'RN + TS + RNN2',
      _data: [],
      local_data: [],
      quantity: 0,
      total_cart_amount: 0,
      filterModal: false,
      filtersArray: ['BLACK', 'RED'],
      filter_value: 'ALL'
    };
  }

  componentDidMount() {
    this.getProductList()
  }
  getProductList = () => {
    new WebApi().getProductList().then(data => {
      // console.log('dataaaaaaAAAA', data)
      data.data.forEach((item: Product) => item.qty = 0)
      this.setState({
        _data: data.data,
        local_data: data.data
      })
    })
      .catch((error) => {
        // console.log("catch error", error)
      })

  }
  removeItem = (_item: Product) => {
    this.setState({
      local_data: [...this.state.local_data],
      total_cart_amount: this.state.total_cart_amount - (_item.qty * _item.price)
    })
    _item.qty = 0
  }
  incrementQTY = (_item: Product) => {
    _item.qty += 1
    this.setState({
      local_data: [...this.state.local_data],
      total_cart_amount: this.state.total_cart_amount + _item.price
    })
  }
  decrementQTY = (_item: Product) => {
    if (_item.qty > 0) {
      _item.qty -= 1
      this.setState({
        local_data: [...this.state.local_data],
        total_cart_amount: this.state.total_cart_amount - _item.price
      })
    }
  }
  _renderRowItem = ({ item, index }: { item: Product; index: number; }) => {
    let img_url = undefined
    if (item.img) {
      img_url = item.img.replace(/^http:\/\//i, "https://")
    }
    return <TouchableOpacity
      onPress={() => {

      }}
      key={index}
      style={{
        flexDirection: "row",
        backgroundColor: MAIN_WHITE,
        marginHorizontal: scale(12),
        marginBottom: verticalScale(4),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(6)
      }} >

      <View
        style={{
          flex: 0.17,
          marginLeft: scale(8)
        }}>
        {
          <AutoHeightImage
            width={scale(50)}
            source={{ uri: item.img }}
            style={{
              borderWidth: 1,
              borderColor: "#CCCCCC",
            }}
            resizeMode={"contain"}
          />
        }

      </View>
      <View
        style={{
          flex: 0.50,
          marginLeft: scale(34)
        }}
      >
        <Text
          style={{
            color: SECONDARY_BLACK,
            fontSize: scale(11),
            fontFamily: "BurlingamePro-CondBold",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            color: MAIN_RED,
            fontSize: scale(11),
            fontFamily: "BurlingamePro-CondSemiBold",
          }}
        >
          {`${formatCurrency(item.price)}`}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flex: 0.30,
          paddingHorizontal: scale(4),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.decrementQTY(item)
            }}
            style={{
              backgroundColor: MAIN_WHITE,
              borderColor: SECONDARY_COOL_GRAY_2,
              borderWidth: 1,
              borderRadius: 2,
              width: scale(25),
              alignItems: 'center',
              height: verticalScale(23)
            }}
          >
            <Text
              style={{
                fontSize: scale(18),
                fontFamily: "BurlingamePro-CondBold",
                color: SECONDARY_BLACK
              }}>
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scale(12),
              fontFamily: "BurlingamePro-CondBold",
              marginHorizontal: scale(8),
              marginTop: verticalScale(4),
              color: "#858585",
              // color: SECONDARY_COOL_GRAY_2
            }}
          >
            {item.qty}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.incrementQTY(item)
            }}
            style={{
              backgroundColor: MAIN_WHITE,
              borderColor: SECONDARY_COOL_GRAY_2,
              borderWidth: 1,
              borderRadius: 2,
              width: scale(25),
              alignItems: 'center',
              height: verticalScale(23)
            }}
          >
            <Text
              style={{
                fontSize: scale(18),
                fontFamily: "BurlingamePro-CondBold",
                color: SECONDARY_BLACK
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.removeItem(item)
          }}
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{
            color: MAIN_RED,
            fontSize: scale(11),
            fontFamily: "BurlingamePro-CondSemiBold",
          }}>REMOVE</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  }

  drawLine = () => {
    return (
      <View style={{
        marginHorizontal: scale(24),
        height: 0.7,
        backgroundColor: "#aaa"
      }}>
      </View>
    );
  }
  createMainTotal = (description: string, amount: number) => {
    return (
      <View
        style={{
          marginHorizontal: scale(22),
          marginTop: verticalScale(12),
          marginBottom: verticalScale(28),
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: SECONDARY_BLACK,
              fontSize: scale(12),
              fontFamily: "BurlingamePro-CondBold",
            }}
          >{description}
          </Text>

        </View>
        <Text
          style={{
            color: SECONDARY_BLACK,
            fontSize: scale(12),
            fontFamily: "BurlingamePro-CondBold",
          }}
        >
          {formatCurrency(amount)}
        </Text>
      </View>
    );
  }
  filterSection = () => {
    return (
      <View style={{
        flexDirection: 'row',
        marginBottom: verticalScale(10),
        marginHorizontal: scale(16)
      }}>
        <TouchableOpacity style={{
          backgroundColor: MAIN_WHITE,
          width: '48%',
          marginRight: scale(4),
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: verticalScale(2),
          paddingBottom: verticalScale(2),
          borderWidth: 1,
          borderColor: MAIN_RED,
          paddingHorizontal: scale(12)
        }}
          onPress={() => this.hideModal()}>
          <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
            <Text style={{
              color: GRAY_OTHER,
              fontSize: scale(10),
              fontFamily: "BurlingamePro-CondSemiBold",
            }}>
              FILTERS
                </Text>

            <Text style={{
              color: MAIN_RED,
              fontSize: scale(10),
              paddingTop: verticalScale(2),
              fontFamily: "BurlingamePro-CondSemiBold"
            }}>
              {this.state.filter_value}
            </Text>

          </View>
          <Icon
            color={MAIN_RED}
            name="chevron-down"
            type="entypo"
            size={24}
            activeOpacity={0.6}
          />

        </TouchableOpacity>
      </View>

    )
  }
  _modalView = () => {
    return (
      <Modal
        style={{
          justifyContent: "flex-end",
          margin: 0,
          marginHorizontal: scale(16)
        }}
        useNativeDriver={true}
        backdropTransitionOutTiming={0}
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={this.state.filterModal}
        onBackdropPress={() => {
          this.hideModal()
        }}
      >
        <View
          // maxHeight="95%"
          style={{
            justifyContent: "center",
            backgroundColor: MAIN_WHITE,
            paddingTop: verticalScale(4),
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              marginTop: verticalScale(12),
              fontSize: scale(14),
              color: MAIN_RED,
              fontFamily: "BurlingamePro-CondBold",
              alignSelf: "center",
              paddingHorizontal: scale(32),
              textAlign: "center",
            }}
          >
            FILTERS
              </Text>
          <View style={{ width: '100%', }}>
            <FlatList
              style={{ marginTop: scale(8) }}
              disableVirtualization={false}
              data={this.state.filtersArray}
              renderItem={this._renderCategoryData}
              keyExtractor={item => item.toString()}
            />

          </View>
          <TouchableOpacity
            style={{
              backgroundColor: SECONDARY_COOL_GRAY,
              height: verticalScale(40),
              paddingLeft: scale(8),
              paddingRight: scale(8),
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center"
            }}
            onPress={() => {
              this.setState({
                filter_value: 'All',
                local_data: this.state._data
              })
              // this.filterList("all", this.state.sort)
              this.hideModal()
            }}
          >
            <Text
              style={{
                color: MAIN_RED,
                fontSize: scale(11),
                fontFamily: "BurlingamePro-CondBold",
                elevation: 8,
              }}
            >
              DISPLAY ALL LISTING
                      </Text>

          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
  filterList = (name: string) => {
    let _name = name.toLowerCase()

    this.setState({
      local_data: this.state._data.filter((obj) => {
        return obj.colour.toLowerCase() === _name
      })
    })
  }

  _renderCategoryData = ({ item, index }: { item: string; index: number; }) => {

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.hideModal()
          this.filterList(item)
          this.setState({
            filter_value: item
          })
        }}
        style={{
          justifyContent: "center",
          height: verticalScale(32.7),
          // borderTopColor: item.index == 0 ? MAIN_WHITE : '#aaa',
          // borderTopWidth: item.index == 0 ? 0 : scale(0.8),
        }}
      >
        <Text
          style={{
            color: MAIN_GRAY,
            fontSize: scale(12),
            fontFamily: "BurlingamePro-CondBold",
            textAlign: 'center'
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )

  }
  hideModal = () => {
    this.setState({
      filterModal: !this.state.filterModal,
    })
  }


  render() {
    return (
        <View style={styles.container}>
          <View style={{ flex: 1, marginHorizontal: scale(10), marginTop: verticalScale(60) }}>
            {this.filterSection()}
            <FlatList
              data={this.state.local_data}
              style={{ paddingVertical: 5 }}
              extraData={this.state}
              renderItem={this._renderRowItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          {this.drawLine()}

          {this.createMainTotal("TOTAL", this.state.total_cart_amount)}
          {this._modalView()}
        </View>
    );
  }
}

export default Home;
