import { Component, OnInit } from '@angular/core';
import { Material } from "../../models/material";
import { MistralaiService } from "../../services/mistralai.service";
import { JsonDataServiceService } from "../../services/json-data-service.service";
import { ActivatedRoute, Router } from '@angular/router';
import { generatePrompt } from "../../utils/prompt";
import { Item } from "../../models/item";
import { parseResponse } from "../../utils/parse";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.scss'
})
export class ItemOverviewComponent implements OnInit {
  isLoading: boolean = true;
  materials: Array<Material> = [];
  itemName: string = '';
  response: string = '';
  item: Item | null = null;
  materialDescription: string = '';

  constructor(
    private mistrallaiService: MistralaiService,
    private jsonDataService: JsonDataServiceService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async params => {
      this.itemName = params['itemName'];

      this.jsonDataService.getJsonData<Array<Material>>('data/materials.json').subscribe(materials => {
        this.materials = <Array<Material>>materials;

          this.mistrallaiService.sendMessage(generatePrompt(this.itemName, this.materials)).subscribe(response => {
            this.response = response;
            this.item = parseResponse(response, this.itemName, this.materials) || null;

            if (this.item && this.item.materials.length > 0) {
              this.selectMaterial(this.item.materials[0].name);
            }

            this.isLoading = false;
          });
      });
    });
  }

  selectMaterial(materialName: string) {
    if (!this.item) {
      return;
    }

    this.materialDescription = this.item.materials.find(material =>
      material.name === materialName)?.description || '';
  }
}
