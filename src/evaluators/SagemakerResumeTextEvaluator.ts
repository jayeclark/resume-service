import { ResumeEvaluator } from './Evaluator';
import { RankedItemVariantObject } from '../model/Resume/Item';
// Placeholder for evaluator that calls Sagemaker multimodel endpoint to retrieve score
class SagemakerResumeTextEvaluator implements ResumeEvaluator {
  evaluate() {
    return {} as RankedItemVariantObject;
  }
}