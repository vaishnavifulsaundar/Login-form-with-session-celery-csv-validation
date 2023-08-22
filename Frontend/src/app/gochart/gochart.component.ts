
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-gochart',
  templateUrl: './gochart.component.html',
  styleUrls: ['./gochart.component.css']
})
export class GochartComponent {
  @ViewChild('myDiagramDiv', { static: true }) diagramDiv!: ElementRef;

  private myDiagram!: go.Diagram;

  ngAfterViewInit() {
    this.initializeDiagram();
  }

  initializeDiagram() {
    class SimpleBandedTreeLayout extends go.TreeLayout {
      override doLayout(
        coll: go.Diagram | go.Group | go.Iterable<go.Part>
      ): void {
        if (this.angle === 90 || this.angle === 270) {
          this.angle = this.angle === 90 ? 270 : 90;
        }
     
      
        super.doLayout(coll);
      }
    }

    const init = () => {
      const $ = go.GraphObject.make;

      this.myDiagram = new go.Diagram(this.diagramDiv.nativeElement);

      this.myDiagram.nodeTemplateMap.add(
        'Root',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'blue', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Rubiscape',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'rgba(216,0,115,255)', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Rubiconnect',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'rgba(240,163,10,255)', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Rubistudio',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'rgba(240,163,10,255)', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' },
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Rubisight',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'rgba(240,163,10,255)', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Workflow',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'lightblue', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Workbook',
        $(
          go.Node,
          new go.Binding("location", "loc", go.Point.parse),
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: 'lightblue', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, // Set font weight and size here
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Dashboard',
        $(
          go.Node,"Auto",
          new go.Binding("location", "loc", go.Point.parse),
          
          $(go.Shape, 'RoundedRectangle', { fill: 'lightblue', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );

      this.myDiagram.nodeTemplateMap.add(
        'Models',
        $(
          go.Node,"Auto",
          new go.Binding("location", "loc", go.Point.parse),
          $(go.Shape, 'Ellipse', { fill: 'lightgrey', stroke: 'black' }),
          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          )
        )
      );
      this.myDiagram.nodeTemplateMap.add(
        'Reusable code',
        $(
          go.Node,"Auto",
          new go.Binding("location", "loc", go.Point.parse,),
          $(go.Shape, "Diamond",{ width: 200, height: 100, margin: 4, fill: null },
          { fill: 'lightgrey', stroke: 'black' }),

          $(
            go.TextBlock,
            { margin: 8, font: 'bold 14px sans-serif' }, 
            new go.Binding('text', 'key')
          ),
          // $(go.Shape, { toArrow: "Standard" })
        )
      );

      this.myDiagram.linkTemplate =
        $(go.Link,       
          $(go.Shape)  
        );

      const nodeDataArray = [
        { key: 'Rubiscape', category: 'Rubiscape', itemArray: [], loc:("0 0") },
        { key: 'Rubiconnect', category: 'Rubiconnect', loc:("-200 100") },
        { key: 'Rubistudio', category: 'Rubistudio',loc:("0 100") },
        { key: 'Workflow', category: 'Workflow', loc:("100 200")},
        { key: 'Workbook', category: 'Workbook', loc:("-50 200")},
        { key: 'Rubisight', category: 'Rubisight', loc:("200 100")},
        { key: 'Dashboard', category: 'Dashboard', loc:("200 200")},
        { key: 'Models', category: 'Models', loc:("100 350")},
        { key: 'Reusable code', category: 'Reusable code', loc:("-100 380")},
      ];

     

      const linkDataArray = [
        { from: "Rubiscape", to: "Rubiconnect" },
        { from: "Rubiscape", to: "Rubistudio" },
        { from: "Rubiscape", to: "Rubisight" },
        { from: "Rubistudio", to: "Workflow" },
        { from: "Rubistudio", to: "Workbook" },
        { from: "Rubisight", to: "Dashboard" },
        { from: "Workflow", to: "Models" },
        { from: "Workbook", to: "Workflow" },
        { from: "Workbook", to: "Reusable code" },
     
      ]

      this.myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    };
    
    window.addEventListener('DOMContentLoaded', init.bind(this));
  }
}










 



