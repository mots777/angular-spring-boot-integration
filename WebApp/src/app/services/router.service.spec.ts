import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RouterService } from './router.service';
import { Router } from '@angular/router';
import { RouterStub } from '../router-stub';
import { Location } from '@angular/common';

describe('RouterService', () => {
  let service: RouterService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterService,
        {provide: Router, useClass: RouterStub},
        {provide: Location, useValue: {}}
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(RouterService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([RouterService], (service: RouterService) => {
    expect(service).toBeTruthy();
  }));
});
