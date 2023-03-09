import { ResumeEvaluator } from './Evaluator';
import { RankedItemVariantObject } from '../model/Resume/Item';
// Placeholder for evaluator that calls Sagemaker multimodel endpoint to retrieve score
export class SagemakerResumeTextEvaluator implements ResumeEvaluator {
  constructor() {

  }

  evaluate() {
    return {} as RankedItemVariantObject;
  }
}