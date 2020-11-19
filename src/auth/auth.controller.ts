import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        this.AuthService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.AuthService.signIn(authCredentialsDto)
    }

}
