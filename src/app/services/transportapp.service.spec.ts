import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransportappService } from './transportapp.service';

describe('TransportappService', () => {
  let service: TransportappService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransportappService],
    });
    service = TestBed.inject(TransportappService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes después de cada test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to sign in', () => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'fake-jwt-token' };

    service.signIn(loginData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/authentication/sign-in');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simula la respuesta del backend
  });

  it('should send a POST request to sign up', () => {
    const signupData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const mockResponse = { id: 1, ...signupData };

    service.signUp(signupData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/authentication/sign-up');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simula la respuesta del backend
  });
});
