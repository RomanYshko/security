import { StyleSheet} from 'react-native';

export const LogidinStyle = StyleSheet.create({
      welcomeText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 10,
      },
      imageStyle: {
        resizeMode: 'contain', 
        marginBottom: 50,
      },
      inputAuth: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15,
        width: '80%',
        height: 40,
        backgroundColor: 'white',
      },
      loginButtonContainer: {
        width: '80%',
      },
      loginButton: {
        backgroundColor: '#626ed4',
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:16,
      },
      errorText: {
        color: 'red', // Цвет текста ошибки
        fontSize: 16,
        marginBottom: 10, // Отступ между текстом приветствия и текстом ошибки
      },
})