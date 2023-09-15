import { StyleSheet} from 'react-native';

export const HeaderStyle = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      imageStyle: {
        resizeMode: 'contain',
      },
      userIcon: {
        flex: 1,
        justifyContent: 'flex-end', 
      },
});