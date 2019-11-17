import styled from 'styled-components/native'

export const LoginContainer = styled.View`
    flex: 1;
    justify-content: center;
	align-items: center;

    background: #f5f5f3;
`;

export const LoginInput = styled.TextInput`
    width: 90%;
    margin-bottom: 20px;
    padding: 10px 20px;
    border-radius: 40px;
    background: #ffffff;
`;

export const LoginTouchableOpacity = styled.TouchableOpacity`
    width: 90%;
    margin-bottom: 20px;
    padding: 14px;
    border-radius: 25px;
    background: #46c7af;
    justify-content: center;
	align-items: center;
    color: #ffffff;
`;

export const LoginTouchableOpacityText = styled.Text`
    color: #ffffff;
`;