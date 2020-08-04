import * as React from 'react';
import {View, Text} from 'react-native'

interface State {
 error?: any,
 errorInfo: any
}
interface Props {

}
export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state={
            error: null, errorInfo: null 
        }
    }

    componentDidCatch(error: any, errorInfo: any) {
      this.setState({
        error,
        errorInfo
      });
    }

    render() {
      if (this.state.errorInfo) {
        return (
          <View>
            <Text>Something went wrong.</Text>
            <View style={{ flex:1 }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </View>
          </View>
        );
      }

      return this.props.children;
    }
  }