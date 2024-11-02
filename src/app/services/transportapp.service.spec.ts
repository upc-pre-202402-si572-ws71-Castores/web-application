import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransportappService } from './transportapp.service';
import { environment } from '../environments/environment.prod'; // Ajusta el path si es necesario


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
    const loginData = { username: 'test@example.com', password: 'password123' };
    const mockResponse = { id: 3, token: 'fake-jwt-token' }; // Asegúrate de que la respuesta mock incluya el id

    service.signIn(loginData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Usa backticks para la interpolación de variables en la URL
    const req = httpMock.expectOne(`${environment.apiUrl}/authentication/sign-in`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simula la respuesta del backend con id y token
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

    // Usa backticks para la interpolación de variables en la URL
    const req = httpMock.expectOne(`${environment.apiUrl}/authentication/sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simula la respuesta del backend
  });
});