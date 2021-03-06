import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MachineServiceService} from '../../services/machine-service.service';
import {Personnel} from '../user-profile/user-profile.component';
import {DatePipe} from '@angular/common';
import {EtapeProductionServiceService} from '../../services/etape-production-service.service';
import {PersonnelServiceService} from '../../services/personnel-service.service';

export class Machine {
  id: any;
  designation: any;
   reference: any;
   nomEtapeProduction: any;
   nombreConducteur: any;
   dateMaintenance: any;
   dateCreation: any;
  nomPersonnel: any ;
  etat: any ;
}
@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {
idMachine: any;
  listEtat: any[];
  nomEtapes: any[];
  nomPersonnels: any ;
  response: any ;
  constructor(private etapeProductionService: EtapeProductionServiceService, private personnelServiceService: PersonnelServiceService , private machineService: MachineServiceService , private router: Router,  private route: ActivatedRoute, public datepipe: DatePipe) {
    this.machine = new Machine();
  }
  machine: Machine;
  ngOnInit(): void {
    this.personnelServiceService.getNomPersonnel().subscribe((d: any) => {
      this.nomPersonnels = d;
    });
    this.route.paramMap.subscribe(
      params => {
        this.idMachine = params.get('id');
      }
    );
    this.listEtat = ['En Maintenance',
      'En repos',
      'En marche',
      'En panne'
    ];
   this.etapeProductionService.getNomEtapes().subscribe(response => {
        console.log(response);
        this.response = response,
          this.nomEtapes = this.response;
        console.log(this.machine); },
      (err) => {
        console.log(err);
      }
    );
this.machineService.getMachineById(this.idMachine).subscribe(response => {
  console.log(response);
    this.response = response,
      this.machine = this.response;
    console.log(this.machine); },
(err) => {
  console.log(err);
}
);
    console.log(this.machine);

}


updateMachine() {
  const f: FormData = new FormData();
  f.append('designation', this.machine.designation);
  f.append('reference', this.machine.reference);
  f.append('nomEtapeProduction', this.machine.nomEtapeProduction);
  f.append('nombreConducteur', this.machine.nombreConducteur);
  f.append('nomPersonnel', this.machine.nomPersonnel);
  f.append('dateMaintenance',  this.datepipe.transform(this.machine.dateMaintenance , 'yyyy/MM/dd'));
  f.append('dateCreation',  this.datepipe.transform(this.machine.dateCreation , 'yyyy/MM/dd'));
  f.append('etat', this.machine.etat);
  this.machineService.updateMachine(this.idMachine, f).subscribe(
    response => {
      console.log(response);
      this.router.navigate(['machine']);
    }
  );
}
    }
