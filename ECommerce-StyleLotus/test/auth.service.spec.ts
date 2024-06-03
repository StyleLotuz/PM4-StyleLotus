import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, it  } from "node:test";
import { AuthRepository } from "src/Modules/auth/auth.repository";
import { AuthService } from "src/Modules/auth/auth.service";

describe("Testing Auth Service", () => {

    let authService: AuthService
    let authRepository: AuthRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, AuthRepository]
        }).compile()

        authService = module.get<AuthService>(AuthService)
        authRepository = module.get<AuthRepository>(AuthRepository)
    })

    it("It Should be defined", () => {
        expect(authService).toBeDefined()
    }) 
})