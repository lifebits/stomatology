import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-site-pages',
  templateUrl: './site-pages.component.html',
  styleUrls: ['./site-pages.component.scss']
})
export class SitePagesComponent implements OnInit {

  constructor(
     private iconRegistry: MdIconRegistry,
     private sanitizer: DomSanitizer) {

     iconRegistry
        .addSvgIcon('aldenta-logo',
           sanitizer.bypassSecurityTrustResourceUrl('assets/svg/aldenta-logo.svg'))
        .addSvgIconSetInNamespace('home-page',
           sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sets/home-page-icon.svg'));
  }

  ngOnInit() {
  }

}
