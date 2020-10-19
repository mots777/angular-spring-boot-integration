import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthenticationStub } from './authentication-stub';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { RouterStub } from './router-stub';

describe('CanActivateRouteGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateRouteGuard, 
        { provide: AuthenticationService, useClass: AuthenticationStub },
        { provide: RouterService, useClass: RouterStub }
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([CanActivateRouteGuard], (guard: CanActivateRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
