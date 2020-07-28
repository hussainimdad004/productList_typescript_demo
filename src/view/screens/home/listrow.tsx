import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CText } from '../../elements/custom';

export interface Props {
    item: any, 
    index: number
}

class PureRow extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }


    render() {
        console.log('propssss in purerow', this.props)
        const { item, index } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => { }}
                style={{
                    flexDirection: "row",
                    backgroundColor: 'red',
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 4,
                    borderWidth: 0.75,
                    borderColor: "red"

                    // alignItems: "center"
                }} >

                <View
                    style={{
                        backgroundColor: 'green'
                    }}
                >
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            flex: 1,
                            borderColor: 'blue',
                            borderWidth: 1,
                        }}
                        source={{
                            uri: item.imageurl,
                        }}
                        resizeMode='contain'
                    />

                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        paddingHorizontal: 8,
                        borderWidth: 1,
                        backgroundColor: 'gray'
                    }}
                >
                    <View style={{ alignSelf: "flex-start", borderWidth: 1, flex: 0.8 }}>
                        <CText>{item.name}</CText>
                    </View>
                    <View style={{ alignSelf: "flex-start", borderWidth: 1, flex: 0.2 }}>
                        <View style={{ flexDirection: "row" }}>
                            <CText style={{ backgroundColor: 'yellow', }}>{item.price}</CText>
                            <View style={{ alignSelf: "flex-end" }}>
                                <CText style={{ backgroundColor: 'yellow', }}>{item.price}</CText>
                            </View>



                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

export default PureRow;